<template>
  <div v-for="image in data">
    <div class="relative">
      <NuxtLink :to="$route.path + '/' + image.id">
        <UCard class="cursor-pointer hover:shadow-lg transition hover:scale-105 duration-200 ease-in-out">
          <img :src="image.url" :alt="image.title" class="w-full block rounded aspect-video object-contain" />
          <span class="mt-2 text-xl font-semibold block">{{ image.title }}</span>
        </UCard>
      </NuxtLink>
      
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    data: Object
  })
</script>

<style scoped>

</style>