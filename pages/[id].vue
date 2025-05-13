<template>
  <div class="container mx-auto">
    <div class="xl:w-8/12 mx-auto space-y-4 pt-4">
      <Button
        @click="$router.back" 
        class="group gap-1">
        <MoveLeft
          class="inline-block transition-transform lg:group-hover:-translate-x-1 w-5 h-5"/>
          Back to Gallery
      </Button>
      <div v-if=image class="border p-5 rounded shadow-md">
        <img :src="image.url" :alt="image.title" class="w-full block rounded" />
        <h2 class="my-2 text-xl font-semibold">{{ image.title }}</h2>
        <div class="text-gray-500" v-html="image.description"></div>
      </div>
      <sheetUpdate v-if="user" :image="image"/>
    </div>
  </div>
</template>

<script setup>
  import { MoveLeft } from 'lucide-vue-next'
  const user = useSupabaseUser()
  const store = useStore()
  const { params } = useRoute()

  const image = computed(() => {
    return store.getFileById(params.id)
  })
</script>