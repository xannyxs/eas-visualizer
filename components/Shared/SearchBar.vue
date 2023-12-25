<template>
  <div
    class="sticky top-0 mx-2 border-b border-gray-300 pt-4 pb-3 bg-white flex justify-between items-center"
  >
    <div class="text-3xl">{{ view }}</div>
    <div class="flex justify-end items-center bg-gray-200 rounded">
      <input
        aria-label="Search addresses"
        type="text"
        :placeholder="placeholder"
        class="m-1 p-1 border border-gray-300 rounded transition-all"
        @input="() => handleOnChange"
      />
      <SearchIcon class="m-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchIcon } from "lucide-vue-next";

defineProps({
  view: String,
  placeholder: {
    type: String,
    default: "Search an address...",
  },
  handleOnChange: Function,
});
</script>
