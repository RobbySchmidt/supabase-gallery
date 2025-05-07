<template>
  <div>
    <Sheet>
      <SheetTrigger as-child>
        <Button>
          Update Image
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload Image</SheetTitle>
        </SheetHeader>
        <div class="space-x-2 space-y-2">
          <Input spellcheck="false" v-model="title" placeholder="Title"/>
          <Textarea spellcheck="false" rows="1" v-model="description" placeholder="Description"/>
          <Button 
            @click="updateFile(image.id, title, description)" 
            class="w-fit hover:cursor-pointer">
            Update
          </Button>
          <Button 
            @click="deleteFile(image)" 
            class="w-fit hover:cursor-pointer" 
            variant="destructive">
            Delete
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script setup>
  const props = defineProps({
    image: Object
  })
  const { updateFile, deleteFile } = useStore()
  const title = ref(props.image.title || '')
  const description = ref(props.image.description || '')
</script>