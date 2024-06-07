import styled from "styled-components";

export const StyledWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const StyledInput = styled.input`
  width: 300px;
  height: 30px;
  border-style: none;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 0px;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
  padding-right: 40px;
  padding-left: 15px;
  color: #fff;

  ::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 100;
  }
`;
