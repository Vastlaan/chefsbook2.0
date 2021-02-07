import React from "react";
import styled from "styled-components";
import { ContainerNarrow, Heading3 } from "../../styles";
import Image from "next/image";

export default function LoadingComponent() {
    return (
        <ContainerNarrow>
            <Loading>
                <Image
                    src="/img/loading.gif"
                    alt="loading gif"
                    width="200"
                    height="200"
                />
                <Heading3>Loading data, please wait...</Heading3>
            </Loading>
        </ContainerNarrow>
    );
}

const Loading = styled.div`
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
