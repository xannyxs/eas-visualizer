import { fetchEnsName } from "@wagmi/core";
import { fetchImages } from "./fetch/fetchImages";
import type { ICard as CardType } from "./types";

export default async function buildAccounts(
  attestations: Attestation[],
): Promise<Map<EthereumAddress, CardType>> {
  const hashMap = new Map<EthereumAddress, CardType>();

  const fetchPromises: Promise<
    [EthereumAddress, string, string | null, number | null]
  >[] = attestations.map(async (attestation) => {
    const retroPGFRound = Number(attestation.decodedDataJson[0].value.value);
    const imageUrl = await fetchImages(attestation.recipient);

    let ens: string | null;
    if (process.env.NODE_ENV === "production") {
      ens = await fetchEnsName({ address: attestation.recipient }).catch(
        () => null,
      );
    }

    return [
      attestation.recipient,
      imageUrl,
      ens,
      isNaN(retroPGFRound) ? null : retroPGFRound,
    ] as [EthereumAddress, string, string | null, number | null];
  });

  const fetchedData = await Promise.all(fetchPromises);

  for (const [recipient, imageUrl, ens, retroPGFRound] of fetchedData) {
    const attestation = attestations.find((a) => a.recipient === recipient);

    if (attestation) {
      let referredBy: EthereumAddress | string =
        attestation.decodedDataJson[1].value.value;

      if (
        referredBy &&
        referredBy === "0x0000000000000000000000000000000000000000"
      ) {
        referredBy = "Optimism Foundation";
      }

      const info: CardType = {
        currentAddress: recipient,
        referredBy,
        referredMethod: attestation.decodedDataJson[2].value.value,
        retroPGFRound,
        imageUrl,
        ens,
      };
      hashMap.set(recipient, info);
    }
  }

  return hashMap;
}
