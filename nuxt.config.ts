// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/fonts",
    "@nuxt/ui",
    "@nuxtjs/mdc",
    "@nirvati/nuxt-apollo",
  ],

  apollo: {
    proxyCookies: false,
    clients: {
      default: {
        defaultOptions: {
          query: {
            fetchPolicy: "no-cache",
          },
          watchQuery: {
            fetchPolicy: "no-cache",
          },
        },
        httpEndpoint:
          process.env.GRAPHQL_ENDPOINT_SERVER ||
          "http://127.0.0.1:3000/graphql",
        browserHttpEndpoint:
          process.env.GRAPHQL_ENDPOINT_CLIENT ||
          "http://127.0.0.1:3000/graphql",
      },
    },
    cookieAttributes: {
      // TODO: Remove
      secure: false,
    },
  },

  runtimeConfig: {
    public: {
      browserApiBaseUrl: process.env.BROWSER_API_BASE_URL || "http://127.0.0.1:3000",
    },
  },
  
  css: ["~/assets/main.css"],
});
