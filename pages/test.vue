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
  import { toast } from 'vue-sonner'
  const newTask = ref('')
  const tasks = ref([])
  const supabase = useSupabaseClient();
  const successMessage = ref('')
  const errorMessage = ref('')

  async function fetchTasks() {
    const { data, error } = await supabase
      .from('test')
      .select('*')
      
      tasks.value = data
  }

  async function addTask() {
    if(newTask.value) {
      const { data, error } = await supabase
        .from('test')
        .insert([
          { todo: newTask.value },
        ])
        .select()
  
        await fetchTasks()
  
        toast('Success', {
          description: `New Task "${newTask.value}" has been successfully added`
        })

        newTask.value = ''
    }

    else {
      errorMessage.value = 'no Task has been added'

      setTimeout(() => {
        errorMessage.value = ''
      }, 3000);
    }
  }

  async function checkTask(id) {
    const task = tasks.value.find(t => t.id === id);
    const updatedDone = !task.done;
    const { data, error } = await supabase
      .from('test')
      .update({ done: updatedDone })
      .eq('id', id)
      .select()

      toast('Success', {
        description: 'Status of Task has been updated'
      })

      await fetchTasks()
  }

  async function deleteTask(id) {
    const { error } = await supabase
      .from('test')
      .delete()
      .eq('id', id)

      toast('Success', {
        description: 'The Task hase been deleted'
      })

      await fetchTasks()
  }

  onMounted(fetchTasks)
</script>

<style scoped>

</style>