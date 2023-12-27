<script setup lang="ts">
import {
  UseWagmiPlugin,
  createConfig,
  mainnet,
  configureChains,
} from "use-wagmi";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { InjectedConnector } from "@wagmi/core/connectors/injected";

const nuxtApp = useNuxtApp();
const config = useRuntimeConfig();

const { chains, publicClient } = configureChains(
  [mainnet],
  [infuraProvider({ apiKey: config.public.PUBLIC_INFURA_API as string })],
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  publicClient,
});

useSeoMeta({
  title: "EAS - Visualizer",
  ogTitle: "EAS - Visualizer",
  description: "This is my amazing site, let me tell you all about it.",
  ogDescription: "This is my amazing site, let me tell you all about it.",
});

nuxtApp.vueApp.use(UseWagmiPlugin, wagmiConfig);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
