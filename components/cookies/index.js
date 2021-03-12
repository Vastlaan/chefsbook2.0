import styled from "styled-components";
import {
    Heading1,
    Heading3,
    Heading6,
    ContainerNarrow,
    Text3,
} from "../../styles";

export default function CookiesComponent() {
    return (
        <ContainerNarrow>
            <Cookies>
                <Heading1>Why do we use cookies?</Heading1>
                <Text3 wide>
                    Cookies help us provide, protect and improve the Chefsbook
                    website, such as by personalising content, tailoring and
                    measuring ads, and providing a safer experience. The cookies
                    that we use include session cookies, which are deleted when
                    you close your browser, and persistent cookies, which stay
                    on your browser until they expire or you delete them. While
                    the cookies that we use may change from time to time as we
                    improve and update the Chefsbook website, we use them for
                    the following purposes:
                </Text3>
                <Heading6>Authentication</Heading6>
                <Text3 wide>
                    We use cookies to verify your account and determine when
                    you’re logged in so we can make it easier for you to access
                    the Chefsbook website and show you the appropriate
                    experience and features.
                </Text3>
                <Heading6>Security, site and product integrity</Heading6>
                <Text3 wide>
                    We use cookies to help us keep your account, data and the
                    Chefsbook website safe and secure.We also use cookies to
                    combat activity that violates our policies or otherwise
                    degrades our ability to provide the Chefsbook website.
                </Text3>
                <Heading6>
                    Advertising, recommendations, insights and measurement
                </Heading6>
                <Text3 wide>
                    We use cookies to help us show ads and to make
                    recommendations for businesses and other organisations to
                    people who may be interested in the products, services or
                    causes they promote. We also use cookies to help measure the
                    performance of ad campaigns for businesses that use the
                    Chefsbook website. Although this are not yet implemented, we
                    expect to include them in the future.
                </Text3>
                <Heading6>Site features and services</Heading6>
                <Text3 wide>
                    We use cookies to enable the functionality that helps us
                    provide the Chefsbook website. We also use cookies to help
                    provide you with content relevant to your locale.
                </Text3>
                <Heading6>Google Analytics</Heading6>
                <Text3 wide>
                    We also set cookies from the Chefsbook.org domain that work
                    with the Google Analytics service to help us understand how
                    businesses use Chefsbook's developer sites
                </Text3>

                <Heading1>
                    How can you control Chefsbook’s use of cookies?
                </Heading1>
                <Text3 wide>
                    We use cookies to help personalize and improve content and
                    services, provide a safer experience and to show you useful
                    and relevant ads on and off Chefsbook. You can control how
                    we use data to show you ads and more by using the tools
                    described below.
                </Text3>
                <Text3 wide>
                    In addition, your browser or device may offer settings that
                    allow you to choose whether browser cookies are set and to
                    delete them. These controls vary by browser, and
                    manufacturers may change both the settings they make
                    available and how they work at any time. Certain parts of
                    the Chefsbook website may not work properly if you have
                    disabled browser cookie use. Please be aware these controls
                    are distinct from the controls that Chefsbook offers you.
                </Text3>
            </Cookies>
        </ContainerNarrow>
    );
}

const Cookies = styled.section`
    padding: 9.7rem 1.4rem;
    background-color: ${(p) => p.theme.black};

    p {
        margin: 2.7rem 0;
    }
`;
