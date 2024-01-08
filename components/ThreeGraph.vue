<template>
  <div ref="graph"></div>
  <UModal v-model="isOpen" class="z-20">
    <ShowCard :card-info="selectedCard!" />
  </UModal>
</template>

<script lang="ts">
import ForceGraph3D from "3d-force-graph";
import * as THREE from "three";
import makeBlockie from "ethereum-blockies-base64";
import ShowCard from "./Shared/ShowCard.vue";

export default {
  components: { ShowCard },
  setup() {
    const isOpen = ref(false);
    const selectedCard = ref<ICard | null>(null);

    const getSprite = (node: any) => {
      let sprite = gSpriteCache.value.get(node.id);
      if (!sprite) {
        const data = makeBlockie(node.id);
        const texture = new THREE.TextureLoader().load(data);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(8, 8, 0);
        gSpriteCache.value.set(node.id, sprite);
      }
      return sprite as unknown as THREE.Object3D;
    };
    return {
      getSprite,
      isOpen,
      selectedCard,
    };
  },
  mounted() {
    const highlightLinks = ref(new Set());
    const highlightNodes = ref(new Set());

    function updateHighlight() {
      g.nodeColor(g.nodeColor())
        .linkWidth(g.linkWidth())
        .linkDirectionalParticles(g.linkDirectionalParticles());
    }

    const handleNodeHover = (node: any, hover: boolean) => {
      highlightNodes.value.clear();
      highlightLinks.value.clear();

      const highlightReferralChain = (currentNode: any) => {
        if (!currentNode) return;

        highlightNodes.value.add(currentNode);

        const additionalInfo = gAccounts.value!.get(currentNode.id);
        let referredBy = additionalInfo?.referredBy;

        if (!referredBy) return;

        if (referredBy === "Optimism Foundation") {
          referredBy = "0x0000000000000000000000000000000000000000";
        }
        const link = gData.links.find(
          (link: any) =>
            (link.source.id === currentNode.id &&
              link.target.id === referredBy) ||
            (link.source.id === referredBy &&
              link.target.id === currentNode.id),
        );

        if (link) {
          highlightLinks.value.add(link);
        }

        const parentNode = gData.nodes.find((n: any) => n.id === referredBy);
        highlightReferralChain(parentNode);
        updateHighlight();
      };

      highlightReferralChain(node);
    };

    const handleNodeClick = (node: any) => {
      const nodeData = gAccounts.value!.get(node.id);
      if (!nodeData) {
        return;
      }

      this.selectedCard! = nodeData;
      this.isOpen = true;
      gSelectedNode.value = node;

      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
      const newPos =
        node.x || node.y || node.z
          ? {
              x: node.x * distRatio,
              y: node.y * distRatio,
              z: node.z * distRatio,
            }
          : { x: 0, y: 0, z: distance };

      g.cameraPosition(newPos, node, 3000);
    };

    const g = ForceGraph3D()(this.$refs.graph as HTMLElement);
    if (!gAttestations.value) {
      return;
    }
    const gData = buildGraph(gAttestations.value);

    g.graphData(gData);
    g.linkWidth(0.2);
    g.linkOpacity(0.5);
    g.linkWidth((link) => (highlightLinks.value.has(link) ? 1.5 : 0.2));
    g.linkDirectionalArrowLength(3.5);
    g.linkDirectionalArrowRelPos(1);
    g.linkDirectionalParticles((link) =>
      highlightLinks.value.has(link) ? 20 : 0.06,
    );
    g.linkColor((link) =>
      highlightLinks.value.has(link) ? "red" : "lightblue",
    );
    g.nodeThreeObject((node: any) => this.getSprite(node));
    g.onNodeClick(handleNodeClick);
    g.onNodeHover((node: any) => handleNodeHover(node, true));
  },
};
</script>
