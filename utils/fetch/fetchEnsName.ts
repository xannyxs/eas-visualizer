import type { EthereumAddress } from "~/utils/types";

export default async function fetchEnsName(
  address: EthereumAddress,
): Promise<string | null> {
  try {
    const { data } = await useFetch(`/api/fetchensname?address=${address}`);
    return null;
  } catch (error) {
    console.error("An error occurred while fetching the ENS name:", error);
    return null;
  }
}
