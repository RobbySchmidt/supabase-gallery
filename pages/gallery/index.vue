<template>
  <div class="container max-w-5xl mx-auto p-6 space-y-6">
    <!-- File input -->
    
    <!-- Title and Description inputs -->
    <div class="space-y-4 max-w-sm">
      <UInput 
        ref="fileInput" 
        type="file" 
        trailing-icon="i-lucide-file" 
        class="block" 
        @change="handleFileChange" />
        
      <UInput 
        v-model="imageTitle" 
        label="Image Title" 
        placeholder="Enter a title" 
        class="block" />

      <UInput 
        v-model="imageDescription" 
        label="Image Description" 
        placeholder="Enter a description" 
        class="block" />
    </div>

    <!-- Submit Button to Upload Image and Metadata -->
    <UButton 
      @click="uploadImage" 
      class="mt-4 block w-fit"
      :disabled="!file || !imageTitle || !imageDescription">
      Upload Image
    </UButton>

    <!-- Image Gallery -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <card v-for="image in images" :key="image.id" :image="image" />
    </div>
  </div>
</template>

<script setup>
  const store = useStore()
  const images = computed(() => store.images)
  const toast = useToast()
  const file = ref(null) // Store the file
  const imageTitle = ref('') // Title input field
  const imageDescription = ref('') // Description input field
  const supabase = useSupabaseClient()

  // Capture the selected file from the input field
  function handleFileChange(event) {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      file.value = selectedFile
    }
  }

  async function uploadImage() {
    if (!file.value || !imageTitle.value || !imageDescription.value) return // Ensure file, title, and description are provided

    // Generate a unique file path (timestamp-based)
    const filePath = `${Date.now()}-${file.value.name}`

    // Upload file to Supabase storage
    const { error: uploadError } = await supabase.storage.from('gallery').upload(filePath, file.value)

    if (uploadError) {
      toast.add({ title: 'Upload failed', description: uploadError.message, color: 'red' })
      return
    }

    toast.add({ title: 'Upload successful', description: file.value.name, color: 'green' })

    // Upload metadata (title and description) to the gallery_metadata table
    try {
      const { data: insertData, error: insertError } = await supabase
        .from('gallery_metadata')
        .insert([
          {
            file_name: filePath, // file name to link to storage
            title: imageTitle.value,    // user-provided title
            description: imageDescription.value // user-provided description
          }
        ])

      if (insertError) {
        throw insertError
      }

      // Fetch the updated list of images including metadata
      await store.fetchImages()

      // Clear input fields after upload
      file.value = null
      imageTitle.value = ''
      imageDescription.value = ''
    } catch (insertError) {
      toast.add({ title: 'Metadata insert failed', description: insertError.message, color: 'red' })
    }
  }

  // Fetch images and link metadata on initial load
  onMounted(store.fetchImages)
</script>
