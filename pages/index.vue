<script setup lang="ts">
import { gUseActiveView } from "~/composables/useSidebar";
import GridView from "~/components/View/Grid/GridView.vue";
import SideBarLayout from "~/components/Sidebar/SidebarLayout.vue";
</script>

<template>
  <main class="flex">
    <div class="z-10">
      <SideBarLayout />
    </div>

    <div
      :class="`w-[35rem] relative ${
        gUseActiveView === ActiveView.None ? 'z-0' : 'z-10'
      }`"
    >
      <template v-if="gUseActiveView === ActiveView.Grid">
        <GridView />
      </template>
      <!-- <template v-if="g_useActiveView === ActiveView.List">
        <ListView />
      </template>
      <template v-if="g_useActiveView === ActiveView.Credits">
        <CreditsView />
      </template> -->
    </div>
    <div class="absolute">
      <ThreeGraph />
    </div>
  </main>
</template>
