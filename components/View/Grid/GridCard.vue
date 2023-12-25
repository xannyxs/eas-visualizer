<template>
  <div class="flex m-2 transition-all cursor-pointer items-center">
    <div
      class="shadow-black bg-gray-200 rounded-l-md flex items-center hover:bg-red-100 hover:shadow-md transition-all w-full"
      role="button"
      :aria-label="`Details for ${card.currentAddress}`"
      tabindex="0"
      @click="handleCardClick"
    >
      <NuxtImg
        :src="image"
        :alt="`${card.currentAddress} Avatar`"
        class="rounded-l-md"
        :width="dimensions"
        :height="dimensions"
      />
      <div
        class="flex-grow border-l-2 pl-3 pr-3 flex flex-col justify-center truncate"
      >
        <h2 class="text-md font-semibold truncate">
          {{
            card.ens
              ? `ENS Address: ${card.ens}`
              : `Address: ${card.currentAddress}`
          }}
        </h2>
        <p class="text-gray-500 text-base truncate">
          Referred By: {{ card.referredBy }}
        </p>
      </div>
    </div>
    <button
      class="flex justify-center items-center ml-2 p-2 pt-4 pb-4 bg-gray-200 rounded-r-md hover:bg-red-100 transition-all"
      aria-label="Locate address on map"
      @click="() => onIconClick"
    >
      <LocateFixed :size="25" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { LocateFixed } from "lucide-vue-next";
import type { ICard } from "~/utils/types";

defineProps({
  image: { type: String, required: true },
  card: {
    type: Object as PropType<ICard>,
    required: true,
  },
  onIconClick: { type: Function, required: true },
});

const dimensions = 55;
//   const modalContext = inject('ModalContext');

const handleCardClick = () => {
  // if (modalContext && modalContext.openModal) {
  //   modalContext.openModal(<ShowNodeCard cardInfo={props.card} />);
  // }
};
</script>
