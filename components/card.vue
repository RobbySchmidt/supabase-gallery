<template>
  <div>
    <NuxtLink :to="`/gallery/${image.id}`">
      <UCard class="cursor-pointer hover:shadow-lg transition hover:scale-105 duration-200 ease-in-out">
        <img :src="image.url" :alt="image.title" class="w-full block rounded" />
        <h2 class="mt-2 text-xl font-semibold">{{ image.title }}</h2>
        <p>{{ image.description }}</p>
      </UCard>
    </NuxtLink>
  </div>
</template>

<script setup>
  defineProps({
    image: {
      type: Object,
      required: true
    }
  })
</script>
