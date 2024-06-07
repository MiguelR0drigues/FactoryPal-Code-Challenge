import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setSelectedMetric } from "../../store/metricsSlice";
import { MetricsData } from "../../types";
import NoTableResults from "../no-results/table";
import {
  Padding,
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableCol,
  StyledTableHead,
  StyledTableRow,
} from "./styles";

interface Props {
  data: MetricsData[];
}

const Table = ({ data }: Props): JSX.Element => {
  const cols = Object.keys(data[0] || {});
  const dispatch: AppDispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.metrics.selectedMetric
  );

  const handleMouseEnter = (row: MetricsData) => {
    selected?.id !== row.id &&
      dispatch(setSelectedMetric({ id: row.id, category: row.category }));
  };
  const handleMouseLeave = () => {
    dispatch(setSelectedMetric(undefined));
  };

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <Padding>
            <StyledTable>
              <StyledTableHead>
                <StyledTableRow>
                  {cols.map((col, index) => (
                    <StyledTableCol key={`${col}-${index}`}>
                      {col}
                    </StyledTableCol>
                  ))}
                </StyledTableRow>
              </StyledTableHead>
              <StyledTableBody>
                {data.map((row, index) => (
                  <StyledTableRow
                    key={`${JSON.stringify(row)}-${index}`}
                    isSelected={selected?.id === row.id}
                    onMouseEnter={() => handleMouseEnter(row)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {Object.values(row).map((v, i) => (
                      <StyledTableCell key={`${v}-${i}`}>{v}</StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
              </StyledTableBody>
            </StyledTable>
          </Padding>
        </>
      ) : (
        <NoTableResults />
      )}
    </>
  );
};

export default Table;
