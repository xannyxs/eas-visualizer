<template>
  <div class="flex items-center m-2 w-full transition-all cursor-pointer">
    <div
      class="flex w-[88%] items-center pr-2 bg-gray-200 rounded-l-md transition-all hover:bg-red-100 hover:shadow-md shadow-black"
      role="button"
      :aria-label="`Details for ${card.currentAddress}`"
      tabindex="0"
      @click="handleCardClick"
    >
      <img
        :src="image"
        :alt="`${card.currentAddress} Avatar`"
        class="rounded-l-md"
        :width="dimensions"
        :height="dimensions"
      />
      <div
        class="flex flex-col flex-grow justify-center pr-3 pl-3 border-l-2 truncate"
      >
        <h2 class="font-semibold text-md truncate">
          {{
            card.ens
              ? `ENS Address: ${card.ens}`
              : `Address: ${card.currentAddress}`
          }}
        </h2>
        <p class="text-base text-gray-500 truncate">
          Referred By: {{ card.referredBy }}
        </p>
      </div>
    </div>
    <button
      class="flex justify-center items-center py-4 px-2 ml-2 bg-gray-200 rounded-r-md transition-all hover:bg-red-100"
      aria-label="Locate address on map"
      @click="() => onIconClick"
    >
      <LocateFixed :size="25" />
    </button>
  </div>

  <UModal v-model="isOpen" class="z-20">
    <ShowCard :card-info="card" />
  </UModal>
</template>

<script setup lang="ts">
import { LocateFixed } from "lucide-vue-next";
import { defineProps } from "vue";
import ShowCard from "~/components/Shared/ShowCard.vue";
import type { ICard } from "~/utils/types";

const dimensions = 55;
const isOpen = ref(false);
defineProps({
  image: { type: String, required: true },
  card: { type: Object as PropType<ICard>, required: true },
  onIconClick: { type: Function, required: true },
});

const handleCardClick = () => {
  isOpen.value = !isOpen.value;
};
</script>
