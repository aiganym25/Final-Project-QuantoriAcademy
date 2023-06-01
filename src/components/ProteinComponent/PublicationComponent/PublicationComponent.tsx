import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PublicationComponent.css";
import LinkIcon from "../../../assets/link-icon.svg";
import LinkInactiveIcon from "../../../assets/linkInactive.svg";
import { fetchProteinPublication } from "../../../service/fetchProteinPublication";
import { PublicationInterface } from "../../../interfaces/PublicationInterface";

export default function PublicationComponent(): JSX.Element {
  const { id } = useParams();

  const handlePudMedLink = (publicationId: string): void => {
    window.open(`https://pubmed.ncbi.nlm.nih.gov/${publicationId}`);
  };
  const handleEuropePMCLink = (publicationId: string): void => {
    window.open(`https://pubmed.ncbi.nlm.nih.gov/${publicationId}`);
  };

  const handleThirdLink = (publicationId: string): void => {
    window.open(`https://dx.doi.org/${publicationId}`);
  };
  const [publications, setPublications] = useState<PublicationInterface[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (id) {
        const data = await fetchProteinPublication(id);
        setPublications((prevData) => [...prevData, ...data]);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {publications &&
        publications.map((publication, index) => (
          <div key={index} className="publication__container ">
            <div className="publication__title">{publication.title}</div>
            <div className="publication__authors">
              <ul className="publication__author-list">
                {publication.authors.map((author: string, i: number) => (
                  <li key={i}>
                    <u>{author}</u>
                    {i !== publication.authors.length - 1 && ","}
                  </li>
                ))}
              </ul>
            </div>
            <div className="publication__details">
              <div className="publication__details_detail">
                <div className="publication__details__label">Categories: </div>
                <div className="publication__details__value">
                  {publication.categories}
                </div>
              </div>
              <div className="publication__details_detail">
                <div className="publication__details__label">Cited for: </div>
                <div className="publication__details__value">
                  {publication.citedFor}
                </div>
              </div>
              <div className="publication__details_detail">
                <div className="publication__details__label">Source: </div>
                <div className="publication__details__value">
                  {publication.citationType}
                </div>
              </div>
            </div>
            {publication.citationCrossReferences && (
              <div className="publication__links" key={index}>
                <div
                  className="publication__link"
                  onClick={() => handlePudMedLink(publication.id)}
                >
                  PubMed
                  <img src={LinkIcon} alt="" />
                </div>

                <div
                  className="publication__link"
                  onClick={() => handleEuropePMCLink(publication.id)}
                >
                  Europe PMC
                  <img src={LinkIcon} alt="" />
                </div>

                <div
                  className={`publication__link ${
                    publication.citationCrossReferences.length !== 2 &&
                    "inactive"
                  }`}
                  onClick={() =>
                    handleThirdLink(publication.citationCrossReferences[1].id)
                  }
                >
                  {`${publication.journal} ${publication.volume}:${publication.firstPage}-${publication.lastPage} (${publication.publicationDate})`}
                  <img
                    src={
                      publication.citationCrossReferences.length === 2
                        ? LinkIcon
                        : LinkInactiveIcon
                    }
                    alt=""
                  />
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
