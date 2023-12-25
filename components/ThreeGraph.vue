<script lang="ts">
import ForceGraph3D from "3d-force-graph";
import { c_Query, c_Gql_variables } from "~/CONFIG";

const fetchAttestations = async (
  round: string,
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
        attestation.decodedDataJson[0].value.value === round,
    );
};

export default {
  async mounted() {
    const g = ForceGraph3D()(this.$refs.graph as HTMLElement);
    gAttestations.value = await fetchAttestations("3");
    if (!gAttestations.value) {
      return;
    }
    const gData = buildGraph(gAttestations.value);

    g.graphData(gData);
    g.linkWidth(0.2);
    g.linkOpacity(0.5);
    g.linkDirectionalArrowLength(3.5);
    g.linkDirectionalArrowRelPos(1);
  },
};
</script>

<template>
  <div ref="graph"></div>
</template>
