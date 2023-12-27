import { cClientUri } from "./CONFIG";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  ssr: false,
  routeRules: {
    "/": { cors: true },
    "/api/**": { cors: true },
  },
  modules: [
    "@nuxt/devtools",
    "@nuxtjs/eslint-module",
    "@nuxtjs/apollo",
    "@nuxt/image",
    "@nuxt/ui",
    "nuxt-security",
    "@use-wagmi/nuxt",
  ],
  css: ["~/assets/css/globals.css"],
  apollo: {
    clients: {
      default: {
        httpEndpoint: cClientUri,
      },
    },
  },
  typescript: {
    shim: false,
    strict: true,
  },
  runtimeConfig: {
    public: {
      PUBLIC_OPENSEA_API: process.env.NUXT_PUBLIC_OPENSEA_API || "No-API",
      PUBLIC_INFURA_URL: process.env.NUXT_PUBLIC_INFURA_URL || "No-URL",
      PUBLIC_INFURA_API: process.env.NUXT_PUBLIC_INFURA_API || "No-API",
    },
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        "img-src": [
          "'self'",
          "data:",
          "https://storageapi.fleek.one",
          "https://img.logoipsum.com",
        ],
      },
      crossOriginResourcePolicy: "cross-origin",
      crossOriginEmbedderPolicy: "unsafe-none",
    },
  },
});
