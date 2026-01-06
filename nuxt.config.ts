// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/mdc",
    "@nirvati/nuxt-apollo",
  ],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            excalifont: ["Excalifont", "sans-serif"],
          },
        },
      },
    },
  },
  nitro: {
    moduleSideEffects: ["wired-elements"],
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return tag.startsWith("wired-");
      },
    },
  },

  mdc: {
    components: {
      prose: true,
    },
  },
  components: {
    dirs: [
      {
        path: "~/components",
        pathPrefix: false,
      },
      {
        path: "~/global-components",
        global: true,
        pathPrefix: false,
      },
    ],
  },

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
});
