<template>
  <div class="space-y-4">
    <div>
      <input 
        type="text"
        v-model="addTask"
        class="ring rounded-xs w-fit mr-4">
        <Button 
          @click="insertTask()" 
          class="w-fit">
          create Task
        </Button>
    </div>
    <div v-for="task in tasks" :key="task.id" class="flex items-center gap-2">
      <span :class="{ 'line-through' :task.done }">
        {{ task.todo }}
      </span>
      <input 
        type="text"
        v-model="updTask"
        class="ring rounded-xs w-fit">
      <span 
        @click="checkTask(task.id)" 
        class="text-white bg-green-500 border-2 border-green-500 rounded-full p-1 cursor-pointer">
        <Check class="size-4" />
      </span>
      <span 
        @click="updateTask(task.id)" 
        class="text-white bg-yellow-500 border-2 border-yellow-500 rounded-full p-1 cursor-pointer">
        <Pen class="size-4" />
      </span>
      <span 
        @click="deleteTask(task.id)" 
        class="text-white bg-red-500 border-2 border-red-500 rounded-full p-1 cursor-pointer">
        <X class="size-4" />
      </span>
    </div>
  </div>
</template>

<script setup>
  import { Pen, Check, X } from 'lucide-vue-next'
  const addTask = ref('')
  const updTask = ref('')
  const tasks = ref([])
  const supabase = useSupabaseClient();

  async function fetchTasks() {
    const { data, error } = await supabase
      .from('test')
      .select('*')
      
      tasks.value = data
  }

  async function insertTask() {
    const { data, error } = await supabase
      .from('test')
      .insert([
        { todo: addTask.value },
      ])
      .select()

      await fetchTasks()

      addTask.value = ''
  }

  async function updateTask(id) {
    const { data, error } = await supabase
      .from('test')
      .update({ todo: updTask.value })
      .eq('id', id)
      .select()

      await fetchTasks()

      newTask.value = ''
  }

  async function checkTask(id) {
    const task = tasks.value.find(t => t.id === id);
    const updatedDone = !task.done;
    const { data, error } = await supabase
      .from('test')
      .update({ done: updatedDone })
      .eq('id', id)
      .select()

      await fetchTasks()

      console.log(data)
      console.error(error)
  }

  async function deleteTask(id) {
    const { error } = await supabase
      .from('test')
      .delete()
      .eq('id', id)

      await fetchTasks()
  }

  onMounted(fetchTasks)
</script>

<style scoped>

</style>