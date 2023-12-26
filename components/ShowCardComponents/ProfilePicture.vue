<template>
  <div v-if="url" class="flex w-full justify-center mb-4">
    <NuxtImg
      class="rounded-full border-gray border-2"
      :src="url"
      alt="Optimism NFT"
      :width="dimensions"
      :height="dimensions"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  url: String,
});

const dimensions = 150;
</script>
