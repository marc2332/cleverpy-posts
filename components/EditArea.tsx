import styled from "styled-components";

const EditArea = styled.textarea`
  background: ${({ theme }) => theme.editarea.background};
  color: ${({ theme }) => theme.color};
  border: none;
  margin: 15px 0px;
  width: 100%;
  height: 30%;
  padding: 15px;
  outline: 1px solid ${({ theme }) => theme.editarea.outline};
  border-radius: 5px;
  transition: 0.1s;
  resize: none;
  display: block;
  &:focus {
    outline: 2px solid ${({ theme }) => theme.editarea.outline};
  }
  @media screen and (max-width: 720px) {
    width: 90%;
  }
`;

export default EditArea;
