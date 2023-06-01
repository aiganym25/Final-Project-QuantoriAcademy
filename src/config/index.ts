import { StylesConfig } from "react-select";

export const config = Object.freeze({
  searchProteinURL:
    "https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,cc_subcellular_location&query=",
  filterProteinUrl:
    "https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=",
  proteinInfoURl: "https://rest.uniprot.org/uniprotkb/",
});
export const customSelectStyles: StylesConfig = {
  container: (provided) => ({
    ...provided,
    backgroundColor: "#f5f5f5",
    marginBottom: "1em",
    width: "100%",
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "#f5f5f5",
    color: "#6C6C6C",
    fontSize: "14px",
    fontWeight: 400,
    padding: "3px",
    borderRadius: "5px",
    textAlign: "start",
    cursor: "pointer",
    transition: "all 0.2s",
  }),
};
export const protvistaConfig = {
  categories: [
    {
      name: "category1",
      label: "Category 1",
      trackType: "protvista-track",
      adapter: "protvista-feature-adapter",
      url: "your-api-url",
      tracks: [
        {
          name: "track1",
          label: "Track 1",
          filter: "filter-condition",
          trackType: "protvista-track",
          tooltip: "Track 1 tooltip",
        },
      ],
    },
  ],
};
