import styled from "styled-components";
import { colors } from "../../theme";

export const StyledTable = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  max-width: 1300px;
`;

export const StyledTableHead = styled.thead`
  background-color: ${colors.blue};
  color: white;
  line-height: 34px;
  text-transform: capitalize;
  text-align: center;

  > tr > *:first-child {
    border-radius: 7px 0 0 0;
  }

  > tr > *:last-child {
    border-radius: 0 7px 0 0;
  }
`;

export const StyledTableCol = styled.th`
  width: min-content;
  min-width: 120px;
`;

export const StyledTableBody = styled.tbody`
  > *:not(:last-child) {
    border-bottom: 1px solid ${colors.blue};
  }
`;

export const StyledTableRow = styled.tr<{ isSelected?: boolean }>`
  background-color: ${({ isSelected }) => (isSelected ? colors.lightBlue : "")};
  & > *:not(:first-child) {
    text-transform: capitalize;
  }
`;

export const StyledTableCell = styled.td`
  text-align: center;
  height: 65px;
  max-height: 100px;
  overflow: hidden;
`;
