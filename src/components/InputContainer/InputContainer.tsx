import { Button, Input } from "antd";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state-management/store";
import FilterIcon from "../../assets/filterIcon.svg";
import FilterActiveIcon from "../../assets/filterActiveIcon.svg";
import "./InputContainer.css";
import { setSearchParamQuery } from "../../state-management/slices/searchParamSlice";
import { config } from "../../config/index";
import { setRequestUrl } from "../../state-management/slices/urlSlice";

interface Props {
  isModalOpen: boolean;
  toggleFilterModal: () => void;
}
export default function InputContainer({
  isModalOpen,
  toggleFilterModal,
}: Props): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const dispatch = useAppDispatch();
  const GET_SEARCH_REQUEST_API = config.searchProteinURL;
  const searchParamQuery = useAppSelector(
    (state) => state.searchParam.searchQuery
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

  const handleSearch = (): void => {
    if (query !== null) {
      setSearchParams({ query: query }); //меняем url

      const url = `${GET_SEARCH_REQUEST_API}(${encodeURIComponent(
        query ?? "n%2Fa"
      )})`;
      dispatch(setRequestUrl(url));
      if (searchParamQuery !== query) {
        dispatch(setSearchParamQuery(query)); // store search param query
      }
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
    </div>
  );
}
