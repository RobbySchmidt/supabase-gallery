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
        <span v-if="successMessage" class="text-green-500">
          {{ successMessage }}
        </span>
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
  const newTask = ref('')
  const tasks = ref([])
  const supabase = useSupabaseClient();
  const successMessage = ref('')
  const errorMessage = ref('')

  async function fetchTasks() {
    try {
      const data = await $fetch('/api/tasks')
      tasks.value = data
    } catch (err) {
      errorMessage.value = 'Failed to fetch tasks'
      console.error(err)
    }
  }


  async function addTask() {
    if(newTask.value) {
      const data = await $fetch('/api/tasks', {
        method: 'POST',
        body: { todo: newTask.value }
      })
  
      successMessage.value = `New Task "${newTask.value}" has been successfully added`
      newTask.value = ''
      await fetchTasks()

      setTimeout(() => {
        successMessage.value = ''
      }, 3000);
    }

    else {
      errorMessage.value = 'no Task has been added'
      console.error(err)

      setTimeout(() => {
        errorMessage.value = ''
      }, 3000);
    }
  }

  async function checkTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (!task) return

    const updatedDone = !task.done

    try {
      await $fetch('/api/tasks', {
        method: 'PATCH',
        body: {
          id: task.id,
          done: updatedDone
        }
      })

      await fetchTasks()
    } catch (err) {
      console.error('Error updating task status:', err)
      errorMessage.value = 'Failed to update task'
      setTimeout(() => {
        errorMessage.value = ''
      }, 3000)
    }
  }

  async function deleteTask(id) {
     try {
      await $fetch('/api/tasks', {
        method: 'DELETE',
        body: {
          id: id,
        }
      })

      await fetchTasks()
    } catch (err) {
      console.error('Error delete task status:', err)
      errorMessage.value = 'Failed to delete task'
      setTimeout(() => {
        errorMessage.value = ''
      }, 3000)
    }
  }

  onMounted(fetchTasks)
</script>

<style scoped>

</style>