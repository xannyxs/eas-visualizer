<template>
  <div
    class="py-1 bg-gray-100 rounded-md transition-all cursor-pointer hover:bg-red-100 shadow-black"
    @click="handleCardClick"
  >
    <button
      class="self-start p-2 mt-1 ml-2 bg-gray-200 rounded-md transition-all hover:bg-red-300"
      aria-label="Locate address on map"
      @click="handleIconClick(card.currentAddress)"
    >
      <LocateFixed :size="25" />
    </button>
    <div class="p-2 photo-wrapper">
      <NuxtImg
        :src="image"
        :alt="`${card.currentAddress} Avatar`"
        class="mx-auto rounded-full"
        :width="dimensions"
        :height="dimensions"
      />
    </div>
    <div class="px-2">
      <h3 class="font-semibold leading-8 text-center text-gray-900 text-md">
        <template v-if="card.ens">
          {{ card.ens }}
        </template>
        <template v-else>
          <p class="truncate">{{ card.currentAddress }}</p>
        </template>
      </h3>
      <div class="flex flex-col my-3 text-sm">
        <div class="truncate">
          <span class="font-bold">Referred:&nbsp;</span>
          <span class="truncate">{{ card.referredBy }}</span>
        </div>
        <div>
          <span class="font-bold">Referred Method:&nbsp;</span>
          <span>{{ card.referredMethod }}</span>
        </div>
      </div>
    </div>
  </div>
  <UModal v-model="isOpen" class="z-20">
    <ShowCard :card-info="card" />
  </UModal>
</template>

<script setup lang="ts">
import { LocateFixed } from "lucide-vue-next";
import type { PropType } from "vue";
import type { ICard as CardInfo } from "#imports";
import ShowCard from "~/components/Shared/ShowCard.vue";

const dimensions = 75;
const isOpen = ref(false);
defineProps({
  image: { type: String, required: true },
  card: {
    type: Object as PropType<CardInfo>,
    required: true,
  },
  onIconClick: { type: Function, required: true },
});

const handleIconClick = (nodeId: string) => {
  gSelectedNode.value = nodeId;
};

const handleCardClick = () => {
  isOpen.value = !isOpen.value;
};
</script>
