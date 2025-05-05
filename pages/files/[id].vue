<template>
  <div class="p-6 max-w-3xl mx-auto space-y-4">
    <Button
      @click="$router.back" 
      class="group gap-1 cursor-pointer">
      <MoveLeft
        class="inline-block transition-transform group-hover:-translate-x-1 w-5 h-5"/>
        Back to Gallery
    </Button>

    <div v-if=image class="border p-5 rounded">
      <img :src="image.url" :alt="image.title" class="w-full block rounded" />
      <h2 class="my-2 text-xl font-semibold">{{ image.title }}</h2>
      <div class="text-gray-500" v-html="image.description"></div>
    </div>

    <div class="space-x-2 space-y-2">
      <Input v-model="title" placeholder="Title"/>
      <Textarea rows="1" v-model="description" placeholder="Description"/>
      <Button 
        @click="updateFile(image)" 
        class="w-fit hover:cursor-pointer" 
        color="success">
        Update
      </Button>
      <Button 
        @click="store.deleteFile(image)" 
        class="w-fit hover:cursor-pointer" 
        color="error">
        Delete
      </Button>
    </div>

  </div>
</template>

<script setup>
  import { MoveLeft } from 'lucide-vue-next'
  const store = useStore()
  const { params } = useRoute()
  const title = ref('')
  const description = ref('')

  const image = computed(() => {
    return store.getFileById(params.id)
  })

  async function updateFile(image) {
    try {
      await store.updateFile(image.id, {
        title: title.value || image.title,
        description: description.value || image.description
      })
    } catch (err) {
      console.error('Update failed:', err)
    }
    title.value = ''
    description.value = ''
  }

</script>