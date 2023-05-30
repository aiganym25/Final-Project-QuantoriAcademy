export interface FilterOptionInterface {
  value: string;
  label: string;
}

export interface FilterInterface {
  gene: string;
  model_organism: string;
  sequence_length_from: string;
  sequence_length_to: string;
  annotation_score: string;
  proteins_with: string;
}
