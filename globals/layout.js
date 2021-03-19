import { useEffect, useState } from "react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import CookiesStatement from "../components/modals/cookie_statement";
import styled from "styled-components";

export default function Layout({ children }) {
    const [displayCookies, setDisplayCookies] = useState(false);

    useEffect(() => {
        const isAgreed = window.localStorage.getItem(
            "chefsbookCookiesStatement"
        );
        if (!isAgreed) {
            setDisplayCookies(true);
        }
    }, [displayCookies]);

    return (
        <LayoutContainer>
            <Navigation />
            {children}
            <Footer />
            <CookiesStatement
                displayCookies={displayCookies}
                setDisplayCookies={setDisplayCookies}
            />
        </LayoutContainer>
    );
}

const LayoutContainer = styled.div``;
