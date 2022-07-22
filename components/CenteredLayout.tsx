import styled from "styled-components";

const CenteredLayout = styled.div`
  display: flex;
  justify-content: center;
  & > main {
    width: 650px;
    @media screen and (max-width: 720px) {
      width: 300px;
    }
  }
`;

export default CenteredLayout;
