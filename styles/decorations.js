import styled from "styled-components";

export const Line = styled.div`
    width: 100%;
    height: 1px;
    min-height: 1px;
    background-color: ${(p) => p.theme.grey3};
    margin: ${(p) => (p.margin ? p.margin : "1.4rem 0")};
`;
