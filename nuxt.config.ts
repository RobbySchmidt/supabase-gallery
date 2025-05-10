// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  modules: ['@pinia/nuxt', '@nuxtjs/supabase', 'shadcn-nuxt'],

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['slug', 'id', 'files'],
      exclude: [],
      saveRedirectToCookie: false,
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  devtools: { enabled: false }
})