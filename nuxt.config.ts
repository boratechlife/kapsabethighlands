// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // ssr: false,

  runtimeConfig: {
    public: {
      FB_API_KEY: "AIzaSyA16an7o3tOhPhbMICyIbBQ5rV1P_DKOjQ",
      FB_AUTH_DOMAIN: "kabsabethighlands.firebaseapp.com",
      FB_PROJECT_ID:"kabsabethighlands",
      FB_STORAGE_BUCKET: "kabsabethighlands.appspot.com",
      FB_MESSAGING_SENDER_ID:"904207188756",
      FB_APP_ID: "1:904207188756:web:7c645210de75032e2ff801",
      FB_MEASUREMENT_ID:"G-Q55N6EFSEG"
 
    },
  },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})