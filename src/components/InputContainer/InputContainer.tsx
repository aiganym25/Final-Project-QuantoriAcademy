import { Button, Image, Input } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import FilterIcon from "../../assets/filter-icon.png";
import "./InputContainer.css";
import { setSearchParamQuery } from "../../redux/slices/searchParamSLice";

export default function InputContainer(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const dispatch = useAppDispatch();

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

  return (
    <div className="input-container">
      <Input
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

      <Button className="input-container__filter">
        <Image src={FilterIcon} />
      </Button>
    </div>
  );
}
