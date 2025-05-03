<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6">
    <UButton 
      @click="$router.back()" 
      class="cursor-pointer group">
      <UIcon name="arrow-long-left" class="md:group-hover:-translate-x-1 duration-300 ease-in-out"/>
      Back to Gallery
    </UButton>
    <div class="shadow rounded-md overflow-hidden">
      <img 
        class="block w-full"
        :src="image.image" 
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