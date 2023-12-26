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
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/apollo",
    "@nuxt/image",
    "@nuxt/ui",
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
});
