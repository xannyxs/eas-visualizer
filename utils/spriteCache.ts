import * as THREE from "three";
import { ICard as CardType } from "./types";

export default const initSprites = (
  addressHashMap: Map<string, CardType>,
): Map<string, THREE.Sprite> => {
  const acc = Array.from(addressHashMap.entries()).reduce(
    (acc, [key, value]) => {
      let texture: THREE.Texture;
      const data = value.imageUrl ?? "";

      if (data === "") {
        return acc;
      }

      texture = new THREE.TextureLoader().load(data);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(8, 8, 0);

      acc.set(key, sprite);
      return acc;
    },
    new Map<string, THREE.Sprite>(),
  );

  if (!acc.has("0x0000000000000000000000000000000000000000")) {
    const texture = new THREE.TextureLoader().load("sunny.png");
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(8, 8, 0);
    acc.set("0x0000000000000000000000000000000000000000", sprite);
  }

  return acc;
};
