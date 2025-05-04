import { defineStore } from 'pinia'
import { useSupabaseClient } from '#imports'

export const useStore = defineStore('store', {
  state: () => ({
    files: []
  }),
  getters: {
    getFileById: (state) => (id: any) => {
      return state.files.find(image => image.id === id)   
    },
  },

  actions: { 
    async getFiles() {
      const supabase = useSupabaseClient()
      const { data: files, error } = await supabase
      .from('files')
      .select('*')

      if (error) {
        throw new Error(error.message)
      }
        
      this.files = files
    },

    async deleteFile(image) {
      const supabase = useSupabaseClient()
      const toast = useToast()
    
      try {
        // 1. Delete the image from Supabase storage
        const { error: deleteStorageError } = await supabase.storage.from('files').remove([image.path])
        if (deleteStorageError) {
          throw deleteStorageError
        }
    
        // 2. Delete the metadata from the gallery_metadata table
        const { error } = await supabase
          .from('files')
          .delete()
          .eq('id', image.id)

          await this.getFiles()
    
        // Show a success toast
        toast.add({ title: 'Image deleted successfully', color: 'success' })
    
      } catch (error) {
        // Show an error toast if something fails
        toast.add({ title: 'Error deleting image', description: error.message, color: 'red' })
      }
    
    },
  }
})
