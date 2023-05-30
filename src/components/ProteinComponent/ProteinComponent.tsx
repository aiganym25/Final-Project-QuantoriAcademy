import { message, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { TabsProps } from "antd";
import "./ProteinComponent.css";
import DetailComponent from "./DetailComponent/DetailComponent";
import FeatureComponent from "./FeatureComponent/FeatureComponent";
import { useAppDispatch } from "../../state-management/store";
import { updateProteinDetails } from "../../state-management/slices/proteinSlice";
import PublicationComponent from "./PublicationComponent/PublicationComponent";

interface ProteinInfoType {
  primaryAccession: string;
  uniProtkbId: string;
  organism: string;
  description: string[];
  geneName: string[];
}

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Details`,
    children: <DetailComponent />,
  },
  {
    key: "2",
    label: `Feature viewer`,
    children: <FeatureComponent />,
  },
  {
    key: "3",
    label: `Publications`,
    children: <PublicationComponent />,
  },
];

export default function ProteinComponent(): JSX.Element {
  const { id } = useParams();
  const [proteinInfo, setProteinInfo] = useState<ProteinInfoType>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://rest.uniprot.org/uniprotkb/${id}`
        );

        const resData = await response.json();
        // console.log(resData);
        const data = {
          primaryAccession: resData.primaryAccession,
          uniProtkbId: resData.uniProtkbId,
          organism: resData.organism.scientificName,
          description: resData.proteinDescription.alternativeNames.map(
            (names: any) => names.fullName.value
          ),
          geneName: resData.genes.map((gene: any) => gene.geneName.value),
        };
        setProteinInfo(data);

        const detail = {
          length: resData.sequence.length,
          mass: resData.sequence.molWeight,
          checksum: resData.sequence.crc64,
          lastUpdate: resData.entryAudit.lastSequenceUpdateDate,
          value: resData.sequence.value,
        };
        dispatch(updateProteinDetails(detail));
        // console.log(detail);
      } catch (er) {
        message.error("An error occurred while fetching the protein.");
      }
    };
    fetchData();
  }, [id, dispatch]);
  const proteinTitle = `${proteinInfo?.primaryAccession} / ${proteinInfo?.uniProtkbId}`;
  return (
    <div className="protein-section">
      <div style={{ display: "flex" }}>
        <div className="protein-section__title">
          {proteinTitle.toUpperCase()}
        </div>
        <div
          style={{
            borderRadius: "18px",
            padding: "2px 12px",
            backgroundColor: "#D8E7FF",
            fontSize: "14px",
            fontWeight: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {proteinInfo?.organism}
        </div>
      </div>
      <br />
      <div className="protein-section__subtitle">Protein</div>
      <div className="protein-section__content">
        {proteinInfo?.description?.join(", ")}
      </div>
      <div className="protein-section__subtitle">Gene</div>
      <div className="protein-section__content">
        {proteinInfo?.geneName?.join(", ")}
      </div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}
