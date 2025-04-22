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
      <p>{{ image.description }}</p>
    </UCard>

    <div v-else class="text-center text-gray-500">Image not found</div>
  </div>
</template>


<script setup>
const store = useStore()
const { params } = useRoute()
const image = computed(() => store.getImageById(params.id))

</script>

