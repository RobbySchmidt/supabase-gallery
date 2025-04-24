<template>
  <div class="p-6 max-w-3xl mx-auto">
    <UButton
      @click="$router.back" 
      class="group mb-4 gap-1 cursor-pointer">
      <Icon 
        name="heroicons:arrow-long-left"
        class="inline-block transition-transform group-hover:-translate-x-1 w-5 h-5"/>
      Back to Gallery
    </UButton>

    <UCard v-if=post>
      <img :src="post.author.avatar" :alt="post.author.avatar" class="w-full block rounded" />
      <h2 class="mt-2 text-xl font-semibold">{{ post.title }}</h2>
      <p>{{ post.author.bio }}</p>
    </UCard>

    <div v-else class="text-center text-gray-500">Image not found</div>
    
  </div>
</template>


<script setup>
  const supabase = useSupabaseClient();
  const { params } = useRoute()
  const id = params.id

  const { data: post } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      content,
      author:authors (
        name,
        avatar,
        bio
      )
    `)
    .eq('id', id)
    .single()
</script>

