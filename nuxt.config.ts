import { c_Client_uri } from "./CONFIG";

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
    // "/": { isr: true },
    "/api/**": { cors: true },
  },
  modules: [
    "@nuxt/devtools",
    "@nuxtjs/eslint-module",
    "@nuxtjs/apollo",
    "@nuxt/image",
    "@nuxt/ui",
    "nuxt-security",
  ],
  css: ["~/assets/css/globals.css"],
  apollo: {
    clients: {
      default: {
        httpEndpoint: c_Client_uri,
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
