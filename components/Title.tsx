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
  user-select: none;
  &:hover {
    color: ${(theme) => theme.theme.title.hover.color};
  }
  @media screen and (max-width: 720px) {
    margin: 40px 0px;
    font-size: 50px;
  }
`;

export const SmallTitle = styled.h2`
  color: ${(theme) => theme.theme.smallTitle.color};
  font-size: 30px;
  margin: 25px 0px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${(theme) => theme.theme.smallTitle.border};
  @media screen and (max-width: 720px) {
    font-size: 20px;
    margin-right: 15px;
  }
`;
