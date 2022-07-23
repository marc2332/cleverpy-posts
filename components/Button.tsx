import styled from "styled-components";

const Button = styled.button<{ expanded: boolean }>`
  position: relative;
  border: none;
  background: ${({ theme }) => theme.button.background};
  color: ${({ theme }) => theme.button.color};
  border: 1px solid ${({ theme }) => theme.button.border};
  outline: none;
  margin: 5px;
  padding: 10px 10px;
  ${({ expanded }) => !expanded && "max-width: 100px;"}
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
  border-radius: 7px;
  &:hover {
    border: 1px solid ${({ theme }) => theme.button.hover.border};
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
  }
`;

export default Button;
