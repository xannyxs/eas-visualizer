<template>
  <div
    class="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)]"
  >
    <SearchBar view="Grid view" @change="handleSearchChange" />

    <div v-if="!gAccounts" class="grid grid-cols-2 gap-2 m-2">
      <GridCardSkeleton v-for="index in 16" :key="index" />
    </div>
    <div v-else class="grid grid-cols-2 gap-2 m-2">
      <div v-for="(value, key) in filteredCards" :key="key">
        <GridCard
          :image="value.imageUrl || makeBlockie(value.currentAddress)"
          :card="value"
          @icon-click="handleIconClick(value.currentAddress)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import makeBlockie from "ethereum-blockies-base64";
import GridCard from "./GridCard.vue";
import GridCardSkeleton from "./GridCardSkeleton.vue";
import SearchBar from "~/components/Shared/SearchBar.vue";

const useSearchQuery = useState<string>("seachQuery", () => "");

const filteredCards = () => {
  if (!gAccounts) return [];
  return Array.from(gAccounts.entries()).filter(([key, value]) => {
    const searchLower = useSearchQuery.value.toLowerCase();
    return (
      value.currentAddress.toLowerCase().includes(searchLower) ||
      (value.ens && value.ens.toLowerCase().includes(searchLower))
    );
  });
};

const handleSearchChange = (event: any) => {
  useSearchQuery.value = event.target.value;
};

const handleIconClick = (nodeId: string) => {
  gSelectedNode.value = nodeId;
};
</script>
