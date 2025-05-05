<template>
  <div class="p-6 space-y-6">
    <Button
      @click="signOut" 
      class="ml-auto w-fit block" 
      variant="destructive">
      Logout
    </Button>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
  import { toast } from 'vue-sonner'
  const supabase = useSupabaseClient()
  async function signOut() {
    const { error } = await supabase.auth.signOut() 
      navigateTo('/login') 
      toast('Success', {
        description: 'You have been logged out'
      })
    }
</script>