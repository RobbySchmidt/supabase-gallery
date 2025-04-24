<template>
  <div class="relative">
    <NuxtLink :to="`/gallery/${image.id}`">
      <UCard class="cursor-pointer hover:shadow-lg transition hover:scale-105 duration-200 ease-in-out">
        <img :src="image.url" :alt="image.title" class="w-full block rounded" />
        <h2 class="mt-2 text-xl font-semibold">{{ image.title }}</h2>
        <p>{{ image.description }}</p>
      </UCard>
    </NuxtLink>
    <UButton 
      @click="store.deleteImage(image)" 
      class="w-fit mt-4 hover:cursor-pointer" 
      color="error">
      Delete
    </UButton>
  </div>
</template>

<script setup>

const store = useStore()
  defineProps({
    image: {
      type: Object,
      required: true
    }
  })
</script>
