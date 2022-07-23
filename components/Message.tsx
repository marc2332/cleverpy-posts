import styled from "styled-components";

const Message = styled.div`
  color: ${({ theme }) => theme.color};
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 2px;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const MessageText = styled.span`
  color: ${({ theme }) => theme.color};
  margin-bottom: 10px;
  text-align: center;
`;

export default Message;
