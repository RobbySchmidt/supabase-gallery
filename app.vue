<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
</template>

<script setup>
  const store = useStore()

  const loadData = ref(false)

  Promise.all([store.getFiles()]).then((values) => {
    loadData.value = true;  
  });
</script>

<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.2s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }
</style>