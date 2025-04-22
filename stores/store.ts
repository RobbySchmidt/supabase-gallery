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
        .from('gallery_metadata')
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
    }
    
  }
})
