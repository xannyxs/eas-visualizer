<template>
  <div
    class="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)]"
  >
    <SearchBar view="List view" @change="handleSearchChange" />

    <div v-if="!gAccounts">
      <ListCardSkeleton v-for="index in 16" :key="index" />
    </div>

    <div v-else class="overflow-x-hidden">
      <ListCard
        v-for="value in filteredCards()"
        :key="value[1].currentAddress"
        :image="value[1].imageUrl || makeBlockie(value[1].currentAddress)"
        :card="value[1]"
        :on-icon-click="() => handleIconClick(value[1].currentAddress)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import makeBlockie from "ethereum-blockies-base64";
import ListCard from "./ListCard.vue";
import ListCardSkeleton from "./ListCardSkeleton.vue";
import SearchBar from "~/components/Shared/SearchBar.vue";

const useSearchQuery = useState<string>("seachQuery", () => "");

const filteredCards = () => {
  if (!gAccounts?.value) return [];
  return Array.from(gAccounts.value.entries()).filter(([_key, value]) => {
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
