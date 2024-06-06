import { MetricsData } from "../../types";
import {
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableCol,
  StyledTableHead,
  StyledTableRow,
} from "./styles";

interface Props {
  data: MetricsData[];
  selected:
    | {
        id?: string | null | undefined;
        category: MetricsData["category"];
      }
    | undefined;
  setSelected: React.Dispatch<
    React.SetStateAction<
      | {
          id?: string | null | undefined;
          category: MetricsData["category"];
        }
      | undefined
    >
  >;
}

const Table = ({ data, selected, setSelected }: Props): JSX.Element => {
  const cols = Object.keys(data[0] || {});

  const handleMouseEnter = (row: MetricsData) => {
    setSelected({ id: row.id, category: row.category });
  };
  const handleMouseLeave = () => {
    setSelected(undefined);
  };
  return (
    <>
      {data && (
        <div style={{ padding: "20px" }}>
          <StyledTable>
            <StyledTableHead>
              <StyledTableRow>
                {cols.map((col, index) => (
                  <StyledTableCol key={`${col}-${index}`}>{col}</StyledTableCol>
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
        </div>
      )}
    </>
  );
};

export default Table;
