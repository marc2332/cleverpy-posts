import styled from "styled-components";

const Button = styled.div`
    border: none;
    background: white;
    border: 1px solid rgb(230, 230, 230);
    outline: none;
    padding: 7px 10px;
    max-width: 100px;
    text-align: center;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        box-shadow: 0px 5px 5px rgba(0,0,0,0.15);
    }
`;

export default Button;
