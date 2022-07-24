import styled from "styled-components";

const Avatar = styled.div`
  text-align: center;
  width: 25px;
  height: 25px;
  font-size: 18px;
  border-radius: 50px;
  background: ${({ theme }) => theme.avatar.background};
  color: ${({ theme }) => theme.avatar.color};
  border: 1px solid ${({ theme }) => theme.avatar.border};
  display: flex; 
  align-items: center; 
  justify-content: center;
`;

export default Avatar;
