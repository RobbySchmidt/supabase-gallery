import { defineStore } from 'pinia'
import { useSupabaseClient } from '#imports'
import { toast } from 'vue-sonner'

export const useStore = defineStore('store', {
  state: () => ({
    files: [],
    tasks: []
  }),
  getters: {
    getFileById: (state) => (id: any) => {
      return state.files.find(image => image.id === id)   
    },
  },

  actions: {
    async getTasks() {
      try {
        const data = await $fetch('/api/tasks/get')
        this.tasks = data
      } catch (err) {
        console.error('Failed to fetch tasks:', err)
        toast('Error', {
          description: 'Failed to fetch tasks'
        })
      }
    },

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
          toast('Success', {
            description: 'Image deleted successfully'
          })

          
        } catch (error) {
        }
        
        navigateTo('/')
    },

    async updateFile(id, title, description) {
      const supabase = useSupabaseClient()
    
      const { data, error } = await supabase
        .from('files')
        .update(
          { 
            title, 
            description 
          }
        )
        .eq('id', id)
        .select()
    
      if (error) {
        throw error
      } else {
        await this.getFiles()
        toast('Success', {
          description: 'Image updated successfully'
        })
        return data
      }
    }
    
  }
})
