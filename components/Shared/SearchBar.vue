<template>
  <div
    class="flex sticky top-0 justify-between items-center pt-4 pb-3 mx-2 bg-white border-b border-gray-300"
  >
    <div class="text-3xl">{{ view }}</div>
    <div class="flex justify-end items-center bg-gray-200 rounded">
      <input
        aria-label="Search addresses"
        type="text"
        :placeholder="placeholder"
        class="p-1 m-1 rounded border border-gray-300 transition-all"
      />
      <SearchIcon class="m-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchIcon } from "lucide-vue-next";

defineProps({
  view: { type: String, required: true },
  placeholder: {
    type: String,
    default: "Search an address...",
  },
});
</script>
