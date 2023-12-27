<template>
  <div>
    <div class="ml-4 font-bold">{{ objectName }}</div>
    <div class="m-4 mt-1 bg-gray-300 rounded">
      <a
        :href="
          ens
            ? `https://app.ens.domains/${ens}`
            : `https://etherscan.io/address/${address}`
        "
      >
        <p
          class="p-4 transition-all hover:bg-gray-400 hover:rounded truncate text-mg"
        >
          {{ ens || address }}
        </p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  objectName: { type: String, required: true },
  address: { type: String as PropType<EthereumAddress>, required: true },
  ens: { type: [String, null] as PropType<String | null>, required: true },
});
</script>
