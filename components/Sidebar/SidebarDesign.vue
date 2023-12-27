<template>
  <aside class="h-screen">
    <nav class="flex flex-col h-full bg-white border-r">
      <div class="flex justify-between items-center p-4 pb-2">
        <NuxtImg
          :src="logoSrc"
          :class="`overflow-hidden transition-all ${
            gUseExpanded ? 'w-32' : 'w-0'
          }`"
          alt="logo"
          :width="dimension"
          :height="dimension"
        />
        <button
          class="p-1.5 bg-gray-50 rounded-lg hover:bg-gray-100"
          @click="toggleExpanded"
        >
          <ChevronFirst v-if="gUseExpanded" />
          <ChevronLast v-else />
        </button>
      </div>

      <ul class="flex-1 px-3">
        <slot></slot>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ChevronFirst, ChevronLast } from "lucide-vue-next";
import { gUseExpanded } from "~/composables/useSidebar";

const logoSrc = "https://img.logoipsum.com/243.svg";
const dimension = 150;

const toggleExpanded = () => {
  gUseExpanded.value = !gUseExpanded.value;
};
</script>
