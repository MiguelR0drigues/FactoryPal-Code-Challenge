import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setFilteredMetrics } from "../../store/metricsSlice";
import SearchIcon from "../../theme/icons/Search";
import { StyledInput, StyledWrapper } from "./styles";

const Search = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const metrics = useSelector((state: RootState) => state.metrics.metrics);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (searchTerm === "") {
      dispatch(setFilteredMetrics(undefined));
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = metrics.filter((metric) => {
        return (
          metric.id.toLowerCase().includes(lowerCaseSearchTerm) ||
          metric.label.toLowerCase().includes(lowerCaseSearchTerm) ||
          metric.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          metric.category.toLowerCase().includes(lowerCaseSearchTerm) ||
          metric.value.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
          metric.type.toLowerCase().includes(lowerCaseSearchTerm)
        );
      });
      dispatch(setFilteredMetrics(filtered));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <StyledWrapper className="search-box">
      <SearchIcon />
      <StyledInput
        type="text"
        className="input-search"
        placeholder="Type to Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </StyledWrapper>
  );
};

export default Search;
