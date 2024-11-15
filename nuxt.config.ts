// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxtjs/tailwindcss', // "@pinia/nuxt",
  '@ant-design-vue/nuxt', '@nuxt/image', 'dayjs-nuxt', '@pinia/nuxt'],
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  },
  devServer: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  },
  runtimeConfig: {
    public:{
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api',
    }
  },
})