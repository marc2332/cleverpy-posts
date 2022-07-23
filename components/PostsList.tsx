import styled from "styled-components";

const PostsList = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 30px;
  @media screen and (max-width: 720px) {
    grid-template-columns: auto;
  }
  @media screen and (min-width: 720px) {
    & > div:nth-child(1) {
      grid-column: 1 / span 2;
      max-width: 100%;
    }
  }
`;

export default PostsList;
