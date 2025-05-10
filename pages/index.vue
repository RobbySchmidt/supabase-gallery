<template>
  <div class="container mx-auto py-12 px-6">
    <div class="xl:w-8/12 mx-auto space-y-6">
      <sheetUpload v-if="user"/> 
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