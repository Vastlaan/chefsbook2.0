import Navigation from "../components/navigation";
import Footer from "../components/footer";
import styled from "styled-components";

export default function Layout({ children }) {
    return (
        <LayoutContainer>
            <Navigation />
            {children}
            <Footer />
        </LayoutContainer>
    );
}

const LayoutContainer = styled.div``;
