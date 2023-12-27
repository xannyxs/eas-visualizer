<script lang="ts">
import ForceGraph3D from "3d-force-graph";
import * as THREE from "three";
import makeBlockie from "ethereum-blockies-base64";

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

export default {
  mounted() {
    const g = ForceGraph3D()(this.$refs.graph as HTMLElement);
    if (!gAttestations.value) {
      return;
    }
    const gData = buildGraph(gAttestations.value);

    g.graphData(gData);
    g.linkWidth(0.2);
    g.linkOpacity(0.5);
    g.linkDirectionalArrowLength(3.5);
    g.linkDirectionalArrowRelPos(1);
    g.nodeThreeObject((node: any) => getSprite(node));
  },
};
</script>

<template>
  <div ref="graph"></div>
</template>
