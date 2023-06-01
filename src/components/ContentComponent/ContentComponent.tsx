import "./ContentComponent.css";
import InputContainer from "../InputContainer/InputContainer";
import TableComponent from "../Table/TableComponent";
import { Protein } from "service/fetchDataByChunks";
import { useState } from "react";
import FilterModalComponent from "../../components/FilterModalComponent/FilterModalComponent";

export default function Content(): JSX.Element {
  const [data, setData] = useState<Protein[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const toggleFilterModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="content">
      <InputContainer
        isApplied={isApplied}
        isModalOpen={isModalOpen}
        toggleFilterModal={toggleFilterModal}
      />
      <br />
      <TableComponent data={data} setData={setData} />
      <FilterModalComponent
        isModalOpen={isModalOpen}
        setIsModal={setIsModalOpen}
        setData={setData}
        setIsApplied={setIsApplied}
      />
    </div>
  );
}
