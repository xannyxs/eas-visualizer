<script setup lang="ts">
import { gUseActiveView } from "~/composables/useSidebar";
import GridView from "~/components/View/Grid/GridView.vue";
import ListView from "~/components/View/List/ListView.vue";
import SidebarLayout from "~/components/Sidebar/SidebarLayout.vue";
</script>

<template>
  <main class="flex">
    <div class="z-10">
      <SidebarLayout />
    </div>

    <div
      :class="`w-[35rem] relative ${
        gUseActiveView === ActiveView.None ? 'z-0' : 'z-10'
      }`"
    >
      <template v-if="gUseActiveView === ActiveView.Grid">
        <GridView />
      </template>
      <template v-if="gUseActiveView === ActiveView.List">
        <ListView />
      </template>
    </div>
    <div class="absolute">
      <ThreeGraph />
    </div>
  </main>
</template>
