<template>
  <div
    class="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)]"
  >
    <SearchBar view="Grid view" @change="handleSearchChange" />

    <template v-if="gAccounts" class="grid grid-cols-2 gap-2 m-2">
      <GridCardSkeleton v-for="index in 16" :key="index" />
    </template>
  </div>
</template>

<script setup lang="ts">
import GridCardSkeleton from "./GridCardSkeleton.vue";
import SearchBar from "~/components/Shared/SearchBar.vue";

const useSearchQuery = useState<string>("seachQuery", () => "");

const handleSearchChange = (event: any) => {
  useSearchQuery.value = event.target.value;
};
</script>
