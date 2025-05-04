<template>
  <div class="p-6 max-w-3xl mx-auto">
    <UButton
      @click="$router.back" 
      class="group mb-4 gap-1 cursor-pointer">
      <Icon 
        name="heroicons:arrow-long-left"
        class="inline-block transition-transform group-hover:-translate-x-1 w-5 h-5"/>
        Back to Gallery
    </UButton>

    <UCard v-if=image>
      <img :src="image.url" :alt="image.title" class="w-full block rounded" />
      <h2 class="mt-2 text-xl font-semibold">{{ image.title }}</h2>
      <div v-html="image.description"></div>
    </UCard>

    <div class="space-x-2 space-y-2">
      <UInput v-model="title" placeholder="Title"/>
      <UTextarea rows="1" v-model="description" placeholder="Description"/>
      <UButton 
        @click="updateFile(image)" 
        class="w-fit mt-4 hover:cursor-pointer" 
        color="success">
        Update
      </UButton>
      <UButton 
        @click="store.deleteFile(image)" 
        class="w-fit mt-4 hover:cursor-pointer" 
        color="error">
        Delete
      </UButton>
    </div>

  </div>
</template>

<script setup>
  
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