<template>
  <div class="p-6 space-y-6">
    <Button
      v-if="user"
      @click="signOut" 
      class="ml-auto w-fit block" 
      variant="destructive">
      Logout
    </Button>
    <Button
      v-else
      @click="$router.push('/login')" 
      class="ml-auto w-fit block">
      Login
    </Button>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
  import { toast } from 'vue-sonner'
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  async function signOut() {
    const { error } = await supabase.auth.signOut() 
      navigateTo('/') 
      toast('Success', {
        description: 'You have been logged out'
      })
    }
</script>