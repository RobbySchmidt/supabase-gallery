<template>
  <div class="p-6 space-y-6">
    <UButton
      @click="signOut" 
      class="hover:cursor-pointer ml-auto w-fit block" 
      color="error">
      Logout
    </UButton>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
  const supabase = useSupabaseClient()
  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.add({ title: 'Logout Failed', description: error.message })
    } else {
      navigateTo('/login')
      toast.add({ title: 'Success', description: 'You have been signed out', color: 'success' })
    }
  }
</script>