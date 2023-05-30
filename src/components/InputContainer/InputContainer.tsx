import { Button, Input } from "antd";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../state-management/store";
import FilterIcon from "../../assets/filterIcon.svg";
import FilterActiveIcon from "../../assets/filterActiveIcon.svg";
import "./InputContainer.css";
import { setSearchParamQuery } from "../../state-management/slices/searchParamSlice";
import FilterModalComponent from "../../components/FilterModalComponent/FilterModalComponent";

export default function InputContainer(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleFilterModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

  const handleSearch = (): void => {
    if (query !== null) {
      setSearchParams({ query: query });
      dispatch(setSearchParamQuery(query));
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const inputRef = useRef(null);

  return (
    <div className="input-container">
      <Input
        ref={inputRef}
        value={query || ""}
        placeholder="Enter search value"
        allowClear
        className="input-container__search"
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <Button className="input-container__button" onClick={handleSearch}>
        Search
      </Button>

      <Button
        className={`input-container__filter ${isModalOpen && "active"}`}
        onClick={toggleFilterModal}
      >
        <img src={isModalOpen ? FilterActiveIcon : FilterIcon} alt="" />
      </Button>
      <FilterModalComponent
        isModalOpen={isModalOpen}
        setIsModal={setIsModalOpen}
      />
    </div>
  );
}
