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
    margin-top: 175px;
    width: 60px;
  }
`;

export const SidebarButton = styled(Button)`
  margin: 3px 0px;
  @media screen and (max-width: 720px) {
    width: 40px;
    height: 40px;
    padding: 4px;
  }
`;

export default Sidebar;
