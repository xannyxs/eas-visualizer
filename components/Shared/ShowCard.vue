<template>
  <div class="p-2 h-full bg-white">
    <div class="flex">
      <button class="p-3 text-red-500">
        <X />
      </button>
    </div>
    <ProfilePicture :url="cardInfo.imageUrl" />
    <EnsBar
      object-name="Current ENS address"
      :address="cardInfo.currentAddress"
      :ens="cardInfo.ens"
    />
    <template v-if="cardInfo.referredBy !== 'Optimism Foundation'">
      <EnsBar object-name="Referred by" :address="cardInfo.referredBy" />
    </template>
    <InfoBar object-name="Referred method" :object="cardInfo.referredMethod" />
    <InfoBar
      object-name="RetroPGF Round"
      :object="cardInfo.retroPGFRound || 'N/A'"
    />
  </div>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";
import type { PropType } from "vue";
import type { ICard } from "#imports";
import ProfilePicture from "~/components/ShowCardComponents/ProfilePicture";
import EnsBar from "~/components/ShowCardComponents/EnsBar";
import InfoBar from "~/components/ShowCardComponents/InfoBar";

defineProps({
  cardInfo: {
    type: Object as PropType<ICard>,
    required: true,
  },
});
</script>
