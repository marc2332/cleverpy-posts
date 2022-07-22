import styled from "styled-components";

const CenteredLayout = styled.div`
    display: flex;
    justify-content: center;
    & > main {
        min-width: 650;
        @media screen and (max-width: 720px) {
            min-width: 300px;
        }
    }
`;

export default CenteredLayout;
