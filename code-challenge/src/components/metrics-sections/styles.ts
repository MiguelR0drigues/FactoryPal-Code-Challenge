import styled from "styled-components";

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SubSection = styled.div`
  > h3 {
    font-weight: normal;
    font-size: 14px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledUnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0;
`;

export const StyledListItem = styled.li<{ isSelected: boolean; color: string }>`
  width: 100%;
  display: flex;
  align-items: center;

  &::before {
    content: "\\2022"; /* Unicode for a bullet point */
    font-size: 28px;
    color: ${({ color }) => color};
    margin-right: 4px; /* Adjust the spacing as needed */
  }

  span {
    text-decoration: underline;
    text-decoration-color: ${({ color }) => color};
    text-decoration-thickness: ${({ isSelected }) =>
      isSelected ? "4px" : "2px"};
    font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  }
`;
