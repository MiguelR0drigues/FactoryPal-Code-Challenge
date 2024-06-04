import styled from "styled-components";

export const StyledUnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledListItem = styled.li<{ isSelected: boolean; color: string }>`
  width: 100%;
  text-decoration: underline;
  text-decoration-color: ${({ color }) => color};
  text-decoration-thickness: ${({ isSelected }) =>
    isSelected ? "4px" : "2px"};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  &::marker {
    font-size: 28px;
    color: ${({ color }) => color};
  }
`;
