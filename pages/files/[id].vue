<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6">
    <UButton
      @click="$router.back" 
      class="group cursor-pointer">
      <Icon 
        name="heroicons:arrow-long-left"
        class="inline-block transition-transform group-hover:-translate-x-1 w-5 h-5"/>
      Back to Gallery
    </UButton>
    <div class="shadow rounded-md overflow-hidden">
      <img 
        class="block w-full"
        :src="image.url" 
        :alt="image.title">
      <div
        v-html="image.description"
        class="block text-justify p-4">
      </div>
    </div>
  </div>
</template>

<script setup>
  
  const { getFileById } = useStore()
  const { params } = useRoute()

  const image = computed(() => {
    return getFileById(params.id)
  })
</script>