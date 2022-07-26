import styled from "styled-components";

const CenteredLayout = styled.div`
  background: ${(theme) => theme.theme.background};
  color: ${(theme) => theme.theme.color};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  & > main {
    width: 630px;
    @media screen and (max-width: 720px) {
      width: 320px;
    }
  }
`;

export default CenteredLayout;
