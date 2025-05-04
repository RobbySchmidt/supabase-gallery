<template>
  <div v-for="image in data">
    <div class="relative">
    <NuxtLink :to="$route.path + '/' + image.id">
      <UCard class="cursor-pointer hover:shadow-lg transition hover:scale-105 duration-200 ease-in-out">
        <img :src="image.url" :alt="image.title" class="w-full block rounded aspect-video object-contain" />
        <span class="mt-2 text-xl font-semibold block">{{ image.title }}</span>
      </UCard>
    </NuxtLink>
    <UButton 
      @click="deleteFile(image)" 
      class="w-fit mt-4 hover:cursor-pointer" 
      color="error">
      Delete
    </UButton>
  </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    data: Object
  })

  const { deleteFile } = useStore()
</script>

<style scoped>

</style>