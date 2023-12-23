import { c_CLIENT_URI } from "./CONFIG";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/eslint-module",
    "@nuxtjs/apollo",
    "nuxt-security",
  ],
  css: ["~/assets/css/globals.css"],
  apollo: {
    clients: {
      default: {
        httpEndpoint: c_CLIENT_URI,
        httpLinkOptions: {
          fetchOptions: {
            mode: "cors",
          },
          credentials: "omit",
        },
      },
    },
  },
  typescript: {
    shim: false,
    strict: true,
  },
  security: {
    headers: {
      crossOriginResourcePolicy: "cross-origin",
      crossOriginEmbedderPolicy: "unsafe-none",
    },
  },
  routeRules: {
    "/": { cors: "true" },
  },
});
