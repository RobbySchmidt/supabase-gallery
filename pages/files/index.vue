<template>
  <div class="container mx-auto py-12 px-6">
    <div class="xl:w-8/12 mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      <cardFiles :data="files" />
    </div>
  </div>
</template>

<script setup>
  const store = useStore()
  const { files } = storeToRefs(store)
</script>

<style scoped>

</style>