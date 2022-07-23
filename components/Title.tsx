import styled from "styled-components";

export const BigTitle = styled.h1`
  color: ${(theme) => theme.theme.title.color};
  font-size: 60px;
  margin: 50px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  &:hover {
    color: ${(theme) => theme.theme.title.hover.color};
  }
`;

export const SmallTitle = styled.h2`
  color: ${(theme) => theme.theme.title.color};
  font-size: 30px;
  margin: 25px 0px;
`;
