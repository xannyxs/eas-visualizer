<script lang="ts">
import ForceGraph3D from "3d-force-graph";
import { c_ATTESTER, c_QUERY, c_GQL_VARIABLES } from "~/CONFIG";

const fetchAttestations = async (round: string): Promise<Attestation[]> => {
  const query = gql`
    query Query($where: AttestationWhereInput) {
      attestations(where: $where) {
        attester
        recipient
        decodedDataJson
        timeCreated
      }
    }
  `;

  console.log("hi");
  const { data } = await useAsyncQuery(query);
  console.log(data);
  console.log("hello");

  return data.attestations
    .filter((attestation: Attestation) => attestation.attester === c_ATTESTER)
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
    const N = 300;
    const gData = {
      nodes: [...Array(N).keys()].map((i) => ({ id: i })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => ({
          source: id,
          target: Math.round(Math.random() * (id - 1)),
        })),
    };

    fetchAttestations("3");
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
