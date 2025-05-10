<template>
  <div class="container mx-auto space-y-4">
    <div class="max-w-xl mx-auto">
      <Button
        @click="$router.back" 
        class="group gap-1">
        <MoveLeft
          class="inline-block transition-transform lg:group-hover:-translate-x-1 w-5 h-5"/>
          Back to Gallery
      </Button>
    </div>
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
          <span 
            v-if="errorMessage"
            class="inline-block mt-1 text-sm font-medium text-destructive">
            {{ errorMessage }}
          </span>
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
  import { MoveLeft } from 'lucide-vue-next'
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')
  
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
    errorMessage.value = 'Email Address or Password is not correct';
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000);
    return;
  }

  console.log(values)

  toast('Success', {
    description: 'You have been logged in'
  })
  navigateTo('/');
});

</script>