import styled from "styled-components";

const Input = styled.input`
  transition: 0.1s;
  border: none;
  background: ${({ theme }) => theme.input.background};
  padding: 10px;
  width: 100%;
  max-height: 35px;
  margin: 3px 0px 7px 0px;
  outline: 1px solid ${({ theme }) => theme.input.border};
  border-radius: 6px;
  color: ${({ theme }) => theme.input.color};
  box-sizing: border-box;
  &:focus {
    outline: 2px solid ${({ theme }) => theme.input.focus.border};
  }
`;

export default Input;
