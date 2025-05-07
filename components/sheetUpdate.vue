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
          <Input v-model="title" placeholder="Title"/>
          <Textarea rows="1" v-model="description" placeholder="Description"/>
          <Button 
            @click="store.updateFile(image.id, title, description)" 
            class="w-fit hover:cursor-pointer">
            Update
          </Button>
          <Button 
            @click="store.deleteFile(image)" 
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
  const store = useStore()
  const title = ref(props.image.title || '')
  const description = ref(props.image.description || '')
</script>