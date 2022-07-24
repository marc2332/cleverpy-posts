import styled from "styled-components";

const Button = styled.button<{ expanded: boolean }>`
  position: relative;
  border: none;
  background: ${({ theme }) => theme.button.background};
  color: ${({ theme }) => theme.button.color};
  border: 1px solid ${({ theme }) => theme.button.border};
  outline: none;
  padding: 10px 10px;
  ${({ expanded }) => !expanded && "max-width: 100px;"}
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
  border-radius: 7px;
  -webkit-tap-highlight-color: transparent;
  &:hover {
    border: 1px solid ${({ theme }) => theme.button.hover.border};
    background: ${({ theme }) => theme.button.hover.background};
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
  }
`;

export const ButtonWithIcon = styled(Button)`
  & > svg {
    margin-right: 10px;
  }
`;

export default Button;
