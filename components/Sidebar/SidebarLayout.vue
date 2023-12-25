<template>
  <div class="relative w-[1/4]">
    <Sidebar>
      <SidebarItem
        :icon="LayoutGrid"
        text="Grid view"
        :active="gUseActiveView === ActiveView.Grid"
        @click="() => handleItemClick(ActiveView.Grid)"
      />
      <SidebarItem
        :icon="Rows"
        text="List view"
        :active="gUseActiveView === ActiveView.List"
        @click="() => handleItemClick(ActiveView.List)"
      />
      <SidebarItem
        :icon="Gem"
        text="Credits"
        :active="gUseActiveView === ActiveView.Credits"
        @click="() => handleItemClick(ActiveView.Credits)"
      />
      <SidebarItem
        :icon="Bug"
        text="Report bug"
        :active="gUseActiveView === ActiveView.Bug"
        @click="
          navigateTo(
            'https://github.com/xvoorvaa/attestation-visualizer/issues/new?assignees=&labels=&projects=&template=bug_report.md',
            { external: true },
          )
        "
      />
      <SidebarItem
        :icon="Rocket"
        text="Feature request"
        :active="gUseActiveView === ActiveView.Feature"
        @click="
          navigateTo(
            'https://github.com/xvoorvaa/attestation-visualizer/issues/new?assignees=&labels=&projects=&template=feature_request.md',
            { external: true },
          )
        "
      />
    </Sidebar>
  </div>
</template>

<script setup lang="ts">
import { Gem, LayoutGrid, Rows, Bug, Rocket } from "lucide-vue-next";
import { ActiveView } from "~/utils/types";
import SidebarItem from "~/components/Sidebar/SidebarItem.vue";
import { gUseActiveView } from "~/composables/useSidebar";

const handleItemClick = (view: ActiveView) => {
  gUseActiveView.value = gUseActiveView.value === view ? ActiveView.None : view;
};
</script>
