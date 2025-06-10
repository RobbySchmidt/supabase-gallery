<template>
  <div class="container mx-auto"
    :class="user ? 'py-0' : 'py-12'">
    <div class="xl:w-8/12 mx-auto space-y-4">
      <sheetUpload v-if="user"/> 
      <h2>hallo tim</h2>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <card :data="files" />
      </div>
    </div>
  </div>
</template>

<script setup>
  const store = useStore()
  const { files } = storeToRefs(store)
  const user = useSupabaseUser()
</script>

<style scoped>

</style>