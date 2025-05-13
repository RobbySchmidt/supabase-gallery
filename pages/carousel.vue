<template>
  <div class="container mx-auto">
    <div class="xl:w-8/12 mx-auto space-y-4 pt-4">
      <Carousel
        class="relative w-full"
        :opts="{
          align: 'start',
          loop: true,
        }"
        >
        <CarouselContent>
          <CarouselItem v-for="image in files" :key="index" class="basis-full">
            <div class="p-1">
              <div class="border p-5 rounded shadow-md">
                <img :src="image.url" :alt="image.title" class="w-full block rounded" />
                <h2 class="my-2 text-xl font-semibold">{{ image.title }}</h2>
                <div class="text-gray-500" v-html="image.description"></div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  </div>
</template>

<script setup>
  const store = useStore()
  const { files } = storeToRefs(store)
</script>