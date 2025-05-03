<template>
  <div 
    v-for="image in data" 
    class="shadow rounded-md overflow-hidden md:hover:scale-105 duration-300 ease-in-out">
    <NuxtLink :to="$route.path + '/' + image.id">
      <img 
        class="block w-full" 
        :src="image.image" 
        :alt="image.title">
      <span 
        class="block text-center py-1">
        {{ image.title }}
      </span>
    </NuxtLink>
  </div>
</template>

<script setup>
  defineProps({
    data: Object
  })
</script>

<style scoped>

</style>