import styled from "styled-components";

const PostsList = styled.div`
  background: white;
  display: grid;
  grid-template-columns: auto auto;
  gap: 30px;
  @media screen and (max-width: 720px) {
    grid-template-columns: auto;
  }
`;

export default PostsList;
