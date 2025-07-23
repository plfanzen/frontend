// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "@nuxt/fonts", "@nuxtjs/tailwindcss"],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            excalifont: ["Excalifont", "sans-serif"],
          }
        },
      },
    },
  },
  nitro: {
    moduleSideEffects: ["wired-elements"]
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return tag.startsWith("wired-");
      }
    }
  }
});
