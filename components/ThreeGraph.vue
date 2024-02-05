<template>
  <div ref="graph"></div>
  <UModal v-model="isOpen" class="z-20">
    <ShowCard :card-info="selectedCard!" />
  </UModal>
</template>

<script lang="ts">
import ForceGraph3D, { type ForceGraph3DInstance } from "3d-force-graph";
import * as THREE from "three";
import makeBlockie from "ethereum-blockies-base64";
import ShowCard from "./Shared/ShowCard.vue";

export default {
  components: { ShowCard },
  setup() {
    const g = ref<ForceGraph3DInstance | null>(null);
    const gData = buildGraph(gAttestations.value!);
    const isOpen = ref(false);
    const selectedCard = ref<ICard | null>(null);

    const handleNodeClick = (node: any) => {
      const nodeData = gAccounts.value!.get(node.id);
      if (!nodeData) {
        return;
      }

      selectedCard!.value = nodeData;
      isOpen.value = true;
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

      g.value?.cameraPosition(newPos, node, 3000);
    };

    watch(
      () => gSelectedNode.value,
      (newValue) => {
        if (newValue) {
          const node = gData.nodes.find((node) => node.id === newValue);
          if (node) {
            handleNodeClick(node);
          }
        }
      },
    );

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
      handleNodeClick,
      getSprite,
      isOpen,
      selectedCard,
      gData,
      g,
    };
  },
  mounted() {
    this.g = ForceGraph3D()(this.$refs.graph as HTMLElement);
    const highlightLinks = ref(new Set());
    const highlightNodes = ref(new Set());

    function updateHighlight(g: ForceGraph3DInstance) {
      g.nodeColor(g.nodeColor())
        .linkWidth(g?.linkWidth())
        .linkDirectionalParticles(g?.linkDirectionalParticles());
    }

    const handleNodeHover = (g: ForceGraph3DInstance, node: any) => {
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
        const link = this.gData.links.find(
          (link: any) =>
            (link.source.id === currentNode.id &&
              link.target.id === referredBy) ||
            (link.source.id === referredBy &&
              link.target.id === currentNode.id),
        );

        if (link) {
          highlightLinks.value.add(link);
        }

        const parentNode = this.gData.nodes.find(
          (n: any) => n.id === referredBy,
        );
        highlightReferralChain(parentNode);
        updateHighlight(g);
      };

      highlightReferralChain(node);
    };

    this.g?.graphData(this.gData);
    this.g?.linkWidth(0.2);
    this.g?.linkOpacity(0.5);
    this.g?.linkWidth((link) => (highlightLinks.value.has(link) ? 1.5 : 0.2));
    this.g?.linkDirectionalArrowLength(3.5);
    this.g?.linkDirectionalArrowRelPos(1);
    this.g?.linkDirectionalParticles((link) =>
      highlightLinks.value.has(link) ? 20 : 0.06,
    );
    this.g?.linkColor((link) =>
      highlightLinks.value.has(link) ? "red" : "lightblue",
    );
    this.g?.nodeThreeObject((node: any) => this.getSprite(node));
    this.g?.onNodeClick(this.handleNodeClick);
    this.g?.onNodeHover((node: any) => handleNodeHover(this.g!, node));
  },
};
</script>
