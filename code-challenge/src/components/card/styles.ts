import styled from "styled-components";
import { colors } from "../../theme";

export const StyledCard = styled.article`
  height: 100%;
  min-width: 300px;
  width: fit-content;
  max-width: 90%;
  border-radius: 7px;
  background-color: ${colors.darkGrey};
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
