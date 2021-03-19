import { useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import gsap from "gsap";
import { ButtonPrimary, ButtonSecondary, Text3 } from "../../styles";

export default function CookieStatementComponent({
    displayCookies,
    setDisplayCookies,
}) {
    const cookies = useRef();

    function agree() {
        window.localStorage.setItem("chefsbookCookiesStatement", true);
        setDisplayCookies(false);
    }

    useEffect(() => {
        displayCookies
            ? gsap.to(cookies.current, { autoAlpha: 1, y: 0, duration: 0.3 })
            : gsap.to(cookies.current, {
                  autoAlpha: 0,
                  y: "100%",
                  duration: 0.3,
              });
    }, [displayCookies]);

    return (
        <Cookies ref={cookies}>
            <Text3 wide>
                This website uses cookies to deliver best user experience. By
                visiting this website you agree to our cookies policy.
            </Text3>

            <ButtonContainer>
                <Link href="/cookies">
                    <ButtonPrimary color="orangered"> More info</ButtonPrimary>
                </Link>
                <ButtonSecondary onClick={agree}>Agree</ButtonSecondary>
            </ButtonContainer>
        </Cookies>
    );
}

const Cookies = styled.section`
    position: fixed;
    bottom: 0rem;
    left: 0;
    z-index: 99;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1.4rem 2.7rem;
    background-color: ${(p) => p.theme.black};
    transform: translateY(100%);
    opacity: 0;
    visibility: 0;
`;
const ButtonContainer = styled.div`
    display: flex;
    margin-top: 1.4rem;

    button {
        margin-right: 1.4rem;
    }
`;
