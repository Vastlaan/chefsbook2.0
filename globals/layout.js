import Navigation from "../components/navigation";
import styled from "styled-components";

export default function Layout({ children }) {
    return (
        <LayoutContainer>
            <Navigation />
            {children}
        </LayoutContainer>
    );
}

const LayoutContainer = styled.div``;
