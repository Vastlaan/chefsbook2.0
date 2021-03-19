import React from "react";
import styled, { withTheme } from "styled-components";
import { Heading3, Text, LinkButton } from "../../styles";
import { BsArrowRight } from "react-icons/bs";

function About(props) {
    return (
        <Container>
            <Headline>
                <Heading3>
                    Register new account and significantly improve your daily
                    tasks
                </Heading3>
            </Headline>
            <Details>
                <Text>Manage your kitchen from one place</Text>
                <br />
                <Text>
                    Track events your create, both reservations as well as
                    important appointments
                </Text>
                <br />
                <Text>
                    Create schedules, add team members, send them emails with
                    preparation lists or print their schedule
                </Text>
                <LinkButton href="/" color={props.theme.primaryDark}>
                    Already registered? Go to login page <BsArrowRight />
                </LinkButton>
            </Details>
        </Container>
    );
}
export default withTheme(About);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 40vh;
`;
const Headline = styled.div`
    margin-bottom: 2.7rem;
    overflow: hidden;
`;
const Details = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;

    p {
        margin-bottom: 1.9rem;
    }
`;
