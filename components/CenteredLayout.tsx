import styled from "styled-components";

const CenteredLayout = styled.div`
  background: ${(theme) => theme.theme.background};
  color: ${(theme) => theme.theme.color};
  min-height: 100%;
  display: flex;
  justify-content: center;
  & > main {
    width: 630px;
    @media screen and (max-width: 720px) {
      width: 400px;
    }
  }
`;

export default CenteredLayout;
