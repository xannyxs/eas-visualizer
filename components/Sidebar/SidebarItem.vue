<template>
  <li
    :class="`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
      active
        ? 'bg-gradient-to-tr from-red-200 to-red-100 text-red-800'
        : 'hover:bg-red-50 text-gray-600'
    }`"
  >
    <icon />
    <span
      :class="`overflow-hidden transition-all ${
        gUseExpanded ? 'w-52 ml-3' : 'w-0'
      }`"
      >{{ text }}</span
    >
    <div
      v-if="!gUseExpanded"
      class="absolute left-full invisible py-1 px-2 ml-6 text-sm text-red-800 bg-red-100 rounded-md opacity-20 transition-all -translate-x-3 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
    >
      {{ text }}
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Icon } from "lucide-vue-next";

withDefaults(
  defineProps<{
    icon: Icon;
    text: String;
    active?: boolean;
  }>(),
  {
    active: false,
  },
);
</script>
