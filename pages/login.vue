<template>
  <div class="container max-w-2xl mx-auto">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" class="w-full"/>
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="state.password" type="password" class="w-full"/>
      </UFormField>

      <UButton type="submit" class="hover:cursor-pointer">
        Login
      </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
  import * as z from 'zod'
  import type { FormSubmitEvent } from '@nuxt/ui'

  definePageMeta({
    layout: 'login'
  })

  const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters')
  })

  type Schema = z.output<typeof schema>

  const state = reactive<Partial<Schema>>({
    email: undefined,
    password: undefined
  })
  const supabase = useSupabaseClient();
  
  const toast = useToast()
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { email, password } = event.data;

    await supabase.auth.signInWithPassword({
      email,
      password,
    });

    navigateTo('/files')
      toast.add({ title: 'Success', description: 'You have been logged in', color: 'success' })
      console.log(event.data)
  }
</script>