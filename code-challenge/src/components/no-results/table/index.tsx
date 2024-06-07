import illustrationsMap from "../../../theme/illustration";
import { Wrapper } from "../styles";

const NoTableResults = () => {
  const NoDataFoundIllustration = illustrationsMap.noTableData;

  return (
    <Wrapper data-testid="no-table-results">
      <h2>No results found</h2>
      <NoDataFoundIllustration />
    </Wrapper>
  );
};

export default NoTableResults;
