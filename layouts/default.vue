<script setup lang="ts">
import { c_Query, c_Gql_variables } from "~/CONFIG";

const fetchAttestations = async (
  round: number,
): Promise<Attestation[] | null> => {
  const { data, error } = await useAsyncQuery<AttestationData>(
    gql`
      ${c_Query}
    `,
    c_Gql_variables,
  );

  if (!data.value?.attestations) {
    console.error("Error in Getting Attestations: ", error);
    return null;
  }

  return data.value.attestations
    .map((attestation: any) => ({
      ...attestation,
      decodedDataJson: JSON.parse(attestation.decodedDataJson),
    }))
    .filter(
      (attestation: Attestation) =>
        attestation.decodedDataJson[0].value.value === String(round),
    );
};

gAttestations.value = await fetchAttestations(gRound.value);
if (gAttestations.value) {
  gAccounts.value = await buildAccounts(gAttestations.value);
}
</script>

<template>
  <div>
    <slot />
  </div>
</template>
