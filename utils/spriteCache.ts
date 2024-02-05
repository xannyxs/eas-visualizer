import * as THREE from "three";
import type { ICard as CardType, EthereumAddress } from "./types";

interface SpriteMapItem {
  key: EthereumAddress;
  sprite: THREE.Sprite;
}

export default function initSprites(
  addressHashMap: Map<string, CardType>,
): Promise<Map<EthereumAddress, THREE.Sprite>> {
  const spritePromises = Array.from(addressHashMap.entries()).map(
    ([key, value]): Promise<SpriteMapItem | null> => {
      const data = value.imageUrl ?? "";
      if (data === "") {
        return Promise.resolve(null);
      }

      return new Promise<SpriteMapItem | null>((resolve) => {
        new THREE.TextureLoader().load(
          data,
          (texture) => {
            const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(8, 8, 0);
            resolve({ key: key as EthereumAddress, sprite });
          },
          undefined,
          () => resolve(null),
        );
      });
    },
  );

  return Promise.all(spritePromises).then((sprites) => {
    const acc = new Map<EthereumAddress, THREE.Sprite>();
    sprites.forEach((item) => {
      if (item) acc.set(item.key, item.sprite);
    });

    if (!acc.has("0x0000000000000000000000000000000000000000")) {
      return new Promise<THREE.Texture>((resolve) => {
        new THREE.TextureLoader().load("sunny.png", resolve);
      }).then((texture) => {
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(8, 8, 0);
        acc.set("0x0000000000000000000000000000000000000000", sprite);
        return acc;
      });
    }

    return acc;
  });
}
