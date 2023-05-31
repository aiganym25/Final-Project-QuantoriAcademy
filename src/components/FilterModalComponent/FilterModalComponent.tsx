import { Col, Row, Divider, Input, Button } from "antd";
import "./FilterModalComponent.css";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../state-management/store";
import { config, customSelectStyles } from "../../config/index";
import Select from "react-select";
import { fetchFilterOptions } from "../../service/fetchFilterOptions";
import {
  FilterInterface,
  FilterOptionInterface,
} from "interfaces/FilterOptionsInterface";
import {
  fetchProteins,
  setTableData,
} from "../../state-management/slices/tableDataSlice";
import { fetchFilteredData } from "../../service/fetchFilteredData";

interface Props {
  isModalOpen: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterModalComponent({
  isModalOpen,
  setIsModal,
}: Props): JSX.Element {
  const query = useAppSelector((state) => state.searchParam.searchQuery);
  const GET_FILTER_OPTIONS = `${config.filterProteinUrl}(${encodeURIComponent(
    query ?? ""
  )})`;
  const dispatch = useAppDispatch();

  // options
  const [annotationScoresOptions, setAnnotationScoresOptions] = useState<
    FilterOptionInterface[]
  >([]);
  const [proteinWithOptions, setProteinWithOptions] = useState<
    FilterOptionInterface[]
  >([]);
  const [popularOrganismsOptions, setPopularOrganismsOptions] = useState<
    FilterOptionInterface[]
  >([]);

  // values
  const [geneName, setGeneName] = useState("");
  const [organism, setOrganism] = useState("");
  const [sequenceLengthFrom, setSequenceLengthFrom] = useState("");
  const [sequenceLengthTo, setSequenceLengthTo] = useState("");
  const [annotationScore, setAnnotationScore] = useState("");
  const [proteinsWith, setProteinsWith] = useState("");

  const handleCancel = (): void => {
    setIsModal(false);
    dispatch(setTableData([]));
    const url = `${config.searchProteinURL}${encodeURIComponent(query ?? "")}`;
    console.log(url);
    dispatch(fetchProteins(url));
    resetFields();
  };

  const resetFields = (): void => {
    setGeneName("");
    setOrganism("");
    setSequenceLengthFrom("");
    setSequenceLengthTo("");
    setAnnotationScore("");
    setProteinsWith("");
  };

  const handleApplyFilter = (): void => {
    const selectedFilters = {
      gene: geneName,
      model_organism: organism,
      sequence_length_from: sequenceLengthFrom,
      sequence_length_to: sequenceLengthTo,
      annotation_score: annotationScore,
      proteins_with: proteinsWith,
    };

    setIsModal(false);

    initiateSearch(selectedFilters);
  };

  const initiateSearch = (filters: FilterInterface): void => {
    let url = `${config.searchProteinURL}${encodeURIComponent(query ?? "")}`;

    const { sequence_length_from, sequence_length_to, ...restFilters } =
      filters;

    Object.entries(restFilters).forEach(([filterKey, filterValue]) => {
      url += encodeURIComponent(` AND (${filterKey}:${filterValue})`);
    });

    if (sequence_length_from && sequence_length_to) {
      url += encodeURIComponent(
        ` AND (length:[${sequence_length_from} TO ${sequence_length_to}])`
      );
    }
    // dispatch(fetchProteins(url));
    const getFilteredData = async (api: string): Promise<void> => {
      const data = await fetchFilteredData(api);
      console.log(data);
      dispatch(setTableData(data));
    };
    getFilteredData(url);
  };

  useEffect(() => {
    if (isModalOpen && query !== null && query !== "") {
      const fetchData = async (): Promise<void> => {
        const { annotationScores, proteinWith, popularOrganisms } =
          await fetchFilterOptions(query);
        setAnnotationScoresOptions(annotationScores);
        setProteinWithOptions(proteinWith);
        setPopularOrganismsOptions(popularOrganisms);
      };

      fetchData();
    }
  }, [GET_FILTER_OPTIONS, isModalOpen, query]);

  return (
    <div
      className={`filter-modal ${
        isModalOpen ? "display-block" : "display-none"
      }`}
    >
      <div className="filter-modal__header">Filters</div>
      <div key="gene" className="filter-modal__title">
        Gene name
      </div>
      <Input
        value={geneName}
        key="model_organism"
        className="filter-modal__input"
        placeholder="Enter Gene Name"
        type="text"
        onChange={(e) => setGeneName(e.target.value)}
        onClick={(e) => e.stopPropagation()}
      />
      <div key="organism" className="filter-modal__title">
        Organism
      </div>

      <Select
        styles={customSelectStyles}
        placeholder="Select an option"
        options={popularOrganismsOptions}
        defaultValue={organism}
        onChange={(e: any) => setOrganism(e.value)}
      />

      <div key="length" className="filter-modal__title">
        Sequence length
      </div>
      <Row justify="space-between" align="stretch" style={{ width: "100%" }}>
        <Col>
          <Input
            value={sequenceLengthFrom}
            className="filter-modal__input"
            placeholder="From"
            type="number"
            style={{ width: "129px" }}
            onChange={(e) => setSequenceLengthFrom(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </Col>
        <Col>
          <Divider className="filter-modal__divider" />
        </Col>

        <Col>
          <Input
            value={sequenceLengthTo}
            className="filter-modal__input"
            placeholder="To"
            type="number"
            style={{ width: "129px" }}
            onChange={(e) => setSequenceLengthTo(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </Col>
      </Row>

      <div key="annotation_score" className="filter-modal__title">
        Annotation Score
      </div>
      <Select
        styles={customSelectStyles}
        placeholder="Select an option"
        options={annotationScoresOptions}
        defaultValue={annotationScore}
        // value={annotationScore} // Set the selected value here
        onChange={(selectedOption: any) =>
          setAnnotationScore(selectedOption.value)
        }
      />

      <div key="proteins_with" className="filter-modal__title">
        Protein with
      </div>
      <Select
        styles={customSelectStyles}
        placeholder="Select an option"
        options={proteinWithOptions}
        defaultValue={proteinsWith}
        onChange={(e: any) => setProteinsWith(e.label)}
      />
      <Row justify="space-between" style={{ width: "100%" }}>
        <Button
          key="back"
          className="filter-modal__button "
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          disabled={
            !geneName ||
            !organism ||
            !sequenceLengthFrom ||
            !sequenceLengthTo ||
            !annotationScore ||
            !proteinsWith
          }
          key="submit"
          className="filter-modal__button apply"
          onClick={handleApplyFilter}
        >
          Apply filters
        </Button>
      </Row>
    </div>
  );
}
