<template>
  <div v-if="url" class="flex justify-center mb-4 w-full">
    <NuxtImg
      class="rounded-full border-2 border-gray"
      :src="url"
      alt="Optimism NFT"
      :width="dimensions"
      :height="dimensions"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  url: { type: String, required: true },
});

const dimensions = 150;
</script>
