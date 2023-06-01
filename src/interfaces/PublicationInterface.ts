export interface PublicationInterface {
  id: string;
  citationType: string;
  authors: string[];
  citationCrossReferences: {
    database: string;
    id: string;
  }[];
  title: string;
  categories: string;
  citedFor: string;
  journal: string;
  volume: string;
  firstPage: string;
  lastPage: string;
  publicationDate: string;
}
