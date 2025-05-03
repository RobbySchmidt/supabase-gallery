<template>
  <div class="container mx-auto py-12 px-6 space-y-6">
    <div class="xl:w-8/12 mx-auto space-x-6">
      <UInput v-model="fileInput" type="file" @change="handleFileUpload" placeholder="Image"/>
      <UInput v-model="title" placeholder="Title"/>
      <UInput v-model="description" placeholder="Description"/>
      <UButton @click="test()" label="Upload" class="cursor-pointer"/>
    </div>
    <div class="xl:w-8/12 mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      <cardFiles :data="files" />
    </div>
  </div>
</template>

<script setup>
  const store = useStore()
  const { files } = storeToRefs(store)
  const supabase = useSupabaseClient()

  const image = ref(null) // actual file
  const fileInput = ref(null)
  const title = ref('')
  const description = ref('')

  // Handle file input properly
  function handleFileUpload(event) {
    image.value = event.target.files[0]
  }

  async function test() {
    if (!image.value) return

    const file = image.value
    const fileName = `${Date.now()}-${file.name}`

    // 1. Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('files')
      .upload(fileName, file)

    if (uploadError) throw new Error(uploadError.message)

    // 2. Get public URL
    const { data: urlData } = supabase.storage
      .from('files')
      .getPublicUrl(fileName)

    // 3. Insert metadata into the 'files' table
    const { error } = await supabase
      .from('files')
      .insert([
        {
          title: title.value,
          description: description.value,
          url: urlData.publicUrl, // add this line!
        },
      ])

    if (error) throw new Error(error.message)

    // 4. Clear form and refresh file list
    image.value = ''
    fileInput.value = '' 
    title.value = ''
    description.value = ''
    await store.getFiles() // make sure this method fetches from Supabase correctly
  }

</script>


<style scoped>

</style>