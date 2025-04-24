<template>
  <div class="container max-w-5xl mx-auto p-6 space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    <NuxtLink v-for="post in posts" :to="`/blog/${post.id}`">
      <UCard class="cursor-pointer hover:shadow-lg transition hover:scale-105 duration-200 ease-in-out">
        <img :src="post.author.avatar" :alt="post.author.avatar" class="w-full aspect-square object-contain block rounded" />
        <h2 class="mt-2 text-xl font-semibold">{{ post.title }}</h2>
        <p>{{ post.author.name }}</p>
      </UCard>
    </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  const supabase = useSupabaseClient()
  const { data: posts } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      author:authors (
        name,
        avatar
      )
    `)
</script>
