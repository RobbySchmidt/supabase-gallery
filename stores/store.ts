import { defineStore } from 'pinia'
import { useSupabaseClient } from '#imports'

export const useStore = defineStore('store', {
  state: () => ({
    images: []
  }),
  getters: {
    getImageById: (state) => (id: any) => {
      return state.images.find(image => image.id === id)
    }    
  },
  actions: {
    async fetchImages() {
      const supabase = useSupabaseClient()
    
      const { data: files, error: listError } = await supabase
        .storage.from('gallery')
        .list('', { limit: 100 })
    
      if (listError) throw new Error(listError.message)
    
      // Fetch metadata
      const { data: metadata, error: metaError } = await supabase
        .from('gallery')
        .select('*')
    
      if (metaError) throw new Error(metaError.message)
    
      const imagesWithMeta = await Promise.all(
        files
          .filter(file => file.name !== '.emptyFolderPlaceholder')
          .map(async (file) => {
            const { data: url } = supabase.storage.from('gallery').getPublicUrl(file.name)
    
            const meta = metadata.find(m => m.file_name === file.name)
    
            return {
              ...file,
              url: url.publicUrl,
              title: meta?.title || 'Untitled',
              description: meta?.description || ''
            }
          })
      )
    
      this.images = imagesWithMeta
    },
    
    async deleteImage(image) {
      const supabase = useSupabaseClient()
      const toast = useToast()
    
      try {
        // 1. Delete the image from Supabase storage
        const { error: deleteStorageError } = await supabase.storage.from('gallery').remove([image.name])
        if (deleteStorageError) {
          throw deleteStorageError
        }
    
        // 2. Delete the metadata from the gallery_metadata table
        const { error: deleteMetaError } = await supabase
          .from('gallery')
          .delete()
          .eq('file_name', image.name)
    
        if (deleteMetaError) {
          throw deleteMetaError
        }
    
        // 3. Fetch the updated list of images
        await this.fetchImages()
    
        // Show a success toast
        toast.add({ title: 'Image deleted successfully', color: 'success' })
    
      } catch (error) {
        // Show an error toast if something fails
        toast.add({ title: 'Error deleting image', description: error.message, color: 'red' })
      }
    }
    
  }
})
