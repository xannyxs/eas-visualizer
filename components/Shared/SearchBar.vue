<template>
  <div
    class="flex sticky top-0 justify-between items-center pt-4 pb-3 mx-2 bg-white border-b border-gray-300"
  >
    <div class="text-3xl">{{ view }}</div>
    <div class="flex justify-end items-center bg-gray-200 rounded">
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        color="white"
        variant="outline"
        placeholder="Search..."
        trailing
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  view: { type: String, required: true },
  placeholder: {
    type: String,
    default: "Search an address...",
  },
});
</script>
