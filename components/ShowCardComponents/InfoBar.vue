<template>
  <div v-if="object">
    <div class="ml-4 font-bold">{{ objectName }}</div>
    <div class="m-4 mt-1 bg-gray-300 rounded">
      <p class="p-4 truncate text-mg">{{ object }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { EthereumAddress } from "~/utils/types"; // Adjust the import path as needed

defineProps({
  objectName: { type: String, required: true },
  object: {
    type: [String, Number, Object] as PropType<
      EthereumAddress | string | number
    >,
    required: true,
  },
});
</script>
