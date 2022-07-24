import styled from "styled-components";
import Button, { ButtonWithIcon } from "./Button";

const Sidebar = styled.div`
  display: flex;
  align-items: center;
  width: 90px;
  height: 100vh;
  margin-top: 215px;
  flex-direction: column;
  @media screen and (max-width: 720px) {
    margin: 0px;
    position: fixed;
    bottom: 0px;
    height: 55px;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
  }
`;

export const SidebarButton = styled(Button)`
  margin: 3px 0px;
  @media screen and (max-width: 720px) {
    flex: 1;
    margin: 0px;
    max-width: 100%;
    border-radius: 0px;
    border: none;
    &:hover{
      border: none;
      box-shadow: none;
    }
  }
`;

export default Sidebar;
