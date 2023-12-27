import { fetchEnsAvatar } from "@wagmi/core";
import type { EthereumAddress } from "~/utils/types";

export default async function fetchEnsName(
  address: EthereumAddress,
): Promise<string | null> {
  const avatarUrl = await fetchEnsAvatar({
    name: "jxom.eth",
  });

  return null;
}
