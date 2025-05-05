<template>
  <div>
    <Sheet>
      <SheetTrigger as-child>
        <Button>
          Upload Image
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload Image</SheetTitle>
        </SheetHeader>
        <div class="space-y-6 space-x-2">
          <Input v-model="fileInput" type="file" @change="handleFileUpload" placeholder="Image"/>
          <Input v-model="title" placeholder="Title"/>
          <Textarea rows="1" v-model="description" placeholder="Description"/>
          <Button @click="upload()">Upload</Button>
          <SheetClose as-child>
            <Button @click="upload()">Upload and close</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script setup>
  const store = useStore()
  const supabase = useSupabaseClient()
  const image = ref(null) // actual file
  const fileInput = ref(null)
  const title = ref('')
  const description = ref('')

  // Handle file input properly
  function handleFileUpload(event) {
    image.value = event.target.files[0]
  }

  async function upload() {
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
          path: fileName
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