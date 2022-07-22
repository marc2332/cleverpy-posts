import styled from "styled-components";

export const BigTitle = styled.h1`
  color: rgb(50, 50, 50);
  font-size: 60px;
  margin: 50px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    color: rgb(80, 80, 80);
  }
`;

export const SmallTitle = styled.h2`
  color: rgb(50, 50, 50);
  font-size: 30px;
  margin: 25px 0px;
`;
