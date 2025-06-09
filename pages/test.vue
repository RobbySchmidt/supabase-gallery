<template>
  <div class="container mx-auto">
    <div class="space-y-4 lg:w-8/12 mx-auto">
      <div class="flex gap-2 items-center justify-between">
        <input 
          type="text"
          spellcheck="false"
          v-model="newTask"
          class="ring rounded-xs w-full">
          <Button 
            @click="addTask()">
            create Task
          </Button>
      </div>
      <div>
        <span v-if="errorMessage" class="text-red-500">
          {{ errorMessage }}
        </span>
      </div>
      <div v-for="task in tasks" :key="task.id" class="flex items-center justify-between">
        <span :class="{ 'line-through' :task.done }">
          {{ task.todo }}
        </span>
        <div class="flex gap-2">
          <span 
            @click="checkTask(task.id)" 
            class="text-white border-2 rounded-full p-1 cursor-pointer flex-none block"
            :class="task.done ? 'bg-green-500 border-green-500' : 'bg-yellow-500 border-yellow-500'">
            <Check class="size-4" />
          </span>
          <span 
            @click="deleteTask(task.id)" 
            class="text-white bg-red-500 border-2 border-red-500 rounded-full p-1 cursor-pointer flex-none block">
            <X class="size-4" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Check, X } from 'lucide-vue-next'
  import { toast } from 'vue-sonner'
  const newTask = ref('')
  const tasks = ref([])
  const errorMessage = ref('')
  const supabase = useSupabaseClient();

  async function fetchTasks() {
    try {
      const { data, error } = await supabase
        .from('test')
        .select('*')
        .order('created_at', { ascending: false })

        if (error) {
          errorMessage.value = error.message
        }
        
        tasks.value = data
    } catch (err) {
      console.error('Error fetching tasks status:', err)

      toast('Error', {
        description: 'Failed to fetch Tasks'
      })
    }
  }

  async function addTask() {
    if(newTask.value) {
      try {
        const { data, error } = await supabase
          .from('test')
          .insert([
            { todo: newTask.value },
          ])
          .select()

          if (error) {
            errorMessage.value = error.message
          }

        toast('Success', {
          description: `New Task "${newTask.value}" has been successfully added`
        })

        newTask.value = ''
  
        await fetchTasks()

      } catch (err) {
        console.error('Error creating task status:', err)
        
        toast('Error', {
          description: 'Failed to create Task'
        })
      }
    }
  }

  async function checkTask(id) {
    const task = tasks.value.find(t => t.id === id);
    const updatedDone = !task.done;

    try {
      const { data, error } = await supabase
        .from('test')
        .update({ done: updatedDone })
        .eq('id', id)
        .select()

        if (error) {
          errorMessage.value = error.message
        }
  
        toast('Success', {
          description: 'Status of Task has been updated'
        })
  
        await fetchTasks()
    } catch (err) {
      console.error('Error updating task status:', err)

      toast('Error', {
        description: 'Failed to update Task'
      })
    }
  }

  async function deleteTask(id) {
    try {
      const { error } = await supabase
        .from('test')
        .delete()
        .eq('id', id)

        if (error) {
          errorMessage.value = error.message
        }
  
        toast('Success', {
          description: 'The Task hase been deleted'
        })
  
        await fetchTasks()
    } catch (err) {
      console.error('Error delete task status:', err)

      toast('Error', {
        description: 'Failed to delete Task'
      })
    }
  }

  onMounted(fetchTasks)
</script>

<style scoped>

</style>