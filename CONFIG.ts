export const cSchemaid =
  "0xfdcfdad2dbe7489e0ce56b260348b7f14e8365a8a325aef9834818c00d46b31b";
export const cAttester = "0x621477dBA416E12df7FF0d48E14c4D20DC85D7D9";
export const cClientUri = "https://optimism.easscan.org/graphql";

export const cQuery = `
query Attestations($where: AttestationWhereInput) {
  attestations(where: $where) {
      attester
      recipient
      decodedDataJson
  }
}
`;

export const cGqlVariables = {
  where: {
    AND: [
      { schemaId: { equals: cSchemaid } },
      { revoked: { equals: false } },
      { attester: { equals: cAttester } },
    ],
  },
};
