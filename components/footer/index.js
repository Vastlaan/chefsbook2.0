import Link from "next/link";
import styled from "styled-components";
import { respond, FlexRow, SmallText } from "../../styles";

export default function FooterComponent() {
    return (
        <Footer>
            <FlexRow>
                <Copyright wide>
                    &copy;{new Date().getFullYear()} This website has been
                    created by{" "}
                    <a href="https://michalantczak.com">Michal Antczak</a>. All
                    rights reserved.
                </Copyright>
            </FlexRow>
            <Legal>
                <Link href="/cookies">
                    <SmallText>Cookies</SmallText>
                </Link>
                <br />
                <Link href="/terms">
                    <SmallText>Terms & Conditions</SmallText>
                </Link>
            </Legal>
        </Footer>
    );
}
const Footer = styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.7rem 1.4rem;
    background-color: ${(p) => p.theme.blackAlways};
    display: none;
    flex-wrap: wrap;
    justify-content: space-between;
    align-itmes: center;

    ${() => respond("m", "display: flex;")}
`;
const Copyright = styled(SmallText)`
    a {
        color: ${(p) => p.theme.secondary};
        transition: all 0.3s;

        &:hover {
            text-decoration: underline;
        }
    }
`;
const Legal = styled(FlexRow)`
    p {
        margin-right: 1.4rem;
        cursor: pointer;
        transition: all 0.3s;
        text-decoration: underline;

        &:hover {
            color: ${(p) => p.theme.secondary};
        }
    }
`;
