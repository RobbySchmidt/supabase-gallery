<template>
  <div class="container mx-auto">
    <form class="max-w-xl space-y-6 mx-auto" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input v-model="email" type="email" placeholder="Email" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input v-model="password" type="password" placeholder="Password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit">
        Login
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'login'
  })
  import { toTypedSchema } from '@vee-validate/zod'
  import { useForm } from 'vee-validate'
  import { h } from 'vue'
  import * as z from 'zod'
  import { toast } from 'vue-sonner'

  const email = ref('')
  const password = ref('')
  
  const formSchema = toTypedSchema(z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters')
  }))
  
  const { isFieldDirty, handleSubmit } = useForm({
    validationSchema: formSchema,
  })
  
  const onSubmit = handleSubmit(async (values) => {
  const supabase = useSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    console.error('Login failed:', error.message);
    return;
  }

  console.log(values)

  toast('Success', {
    description: 'You have been logged in'
  })
  navigateTo('/files');
});

</script>