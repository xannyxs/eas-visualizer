<template>
  <div class="relative w-[1/4]">
    <SideBar>
      <SideBarItem
        :icon="LayoutGrid"
        text="Grid view"
        :active="gUseActiveView === ActiveView.Grid"
        @click="() => handleItemClick(ActiveView.Grid)"
      />
      <SideBarItem
        :icon="Rows"
        text="List view"
        :active="gUseActiveView === ActiveView.List"
        @click="() => handleItemClick(ActiveView.List)"
      />
      <SideBarItem
        :icon="Gem"
        text="Credits"
        :active="gUseActiveView === ActiveView.Credits"
        @click="() => handleItemClick(ActiveView.Credits)"
      />
      <SideBarItem
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
      <SideBarItem
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
    </SideBar>
  </div>
</template>

<script setup lang="ts">
import { Gem, LayoutGrid, Rows, Bug, Rocket } from "lucide-vue-next";
import SideBar from "./SideBar.vue";
import { ActiveView } from "~/utils/types";
import SideBarItem from "~/components/Sidebar/SideBarItem.vue";
import { gUseActiveView } from "~/composables/useSidebar";

const handleItemClick = (view: ActiveView) => {
  gUseActiveView.value = gUseActiveView.value === view ? ActiveView.None : view;
};
</script>
