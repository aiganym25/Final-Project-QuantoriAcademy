interface Protein {
  key: number;
  primaryAccession: string;
  uniProtkbId: string;
  genes: string;
  organism: string;
  locations: string;
  length: number;
}
export const fetchFilteredData = async (api: string): Promise<Protein[]> => {
  const response = await fetch(api);
  const res = await response.json();
  const newEntities: Protein[] = res.results.map(
    (
      result: {
        primaryAccession: string;
        uniProtkbId: string;
        genes?: {
          orfNames?: { value: string }[];
          geneName?: { value: string };
        }[];
        organism: { scientificName: string };
        sequence: { length: number };
        comments?: {
          subcellularLocations: { location: { value: string } }[];
        }[];
      },
      index: number
    ) => {
      let genes = "";
      if (result.genes) {
        if (result.genes[0]?.orfNames) {
          genes = result.genes
            .map((gene) =>
              gene.orfNames?.map((value) => value.value).join(", ")
            )
            .join(", ");
        } else if (result.genes[0]?.geneName) {
          genes = result.genes.map((gene) => gene.geneName?.value).join(", ");
        }
      }
      const organism = result.organism.scientificName;
      const length = result.sequence.length;
      const locations = result.comments
        ?.map(
          (el: { subcellularLocations: { location: { value: string } }[] }) =>
            el.subcellularLocations.map(
              (loc: { location: { value: string } }) => loc.location.value
            )
        )
        ?.join(", ");

      return {
        key: index + 1,
        primaryAccession: result.primaryAccession,
        uniProtkbId: result.uniProtkbId,
        genes: genes,
        organism: organism,
        locations: locations,
        length: length,
      };
    }
  );
  return newEntities;
};
