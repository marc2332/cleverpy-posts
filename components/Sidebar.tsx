import styled from "styled-components";
import Button, { ButtonWithIcon } from "./Button";

const Sidebar = styled.div`
  display: flex;
  align-items: start;
  width: 60px;
  height: 100vh;
  margin-top: 215px;
  flex-direction: column;
  @media screen and (min-width: 720px) {
    width: 90px;
  }
`;

export const SidebarButton = styled(Button)`
  margin: 3px 0px;
  max-width: 50px;
  max-height: 50px;
`;

export default Sidebar;
