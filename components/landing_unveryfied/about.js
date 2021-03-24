import React, { useRef, useEffect, useState } from "react";
import styled, { withTheme } from "styled-components";
import { Heading3, Text, LinkButton } from "../../styles";
import { BsArrowRight } from "react-icons/bs";
import gsap from "gsap";

function About(props) {
    const heading = useRef(null);
    const details = useRef(null);

    const dataFromApi = [
        {
            heading:
                "Service for creative chefs who love to share their passion",
            text1:
                "This service is dedicated to all the chefs who want to manage their kitchen in easy and modern way.",
            text2:
                "Our mission is to consolidate all necessary tools in one place to help you organise your workplace.",
            text3:
                "We are free of charge. It means you can freely use all our features",
        },
        {
            heading:
                "Modern tool for chefs who want to manage their kitchen and team.",
            text1: "Create and store your recepies digital.",
            text2: "Add new or remove canceled events in the Calendar.",
            text3:
                "Manage team schedule and create your preparation list for the following days.",
        },
    ];

    const [data, setData] = useState(dataFromApi[0]);

    function triggerAnimation() {
        gsap.set(heading.current, { autoAlpha: 0, y: 100 });
        gsap.to(heading.current, { autoAlpha: 1, y: 0, duration: 0.6 });
        gsap.set(details.current.children, { autoAlpha: 0, x: 100 });
        gsap.to(details.current.children, {
            autoAlpha: 1,
            x: 0,
            stagger: 0.1,
        });
    }
    useEffect(() => {
        triggerAnimation();
    }, []);
    function updateState() {
        if (Object.keys(data).length === 0) {
            setData(dataFromApi[0]);
        } else if (data.heading === dataFromApi[0].heading) {
            setData(dataFromApi[1]);
        } else {
            setData(dataFromApi[0]);
        }
    }

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest function.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    useInterval(() => {
        triggerAnimation();
        updateState();
    }, 5000);

    return (
        <Container>
            <Headline>
                <Heading3 ref={heading}>{data.heading}</Heading3>
            </Headline>
            <Details ref={details}>
                <Text>{data.text1}</Text>
                <br />
                <Text>{data.text2}</Text>
                <br />
                <Text>{data.text3}</Text>
                <LinkButton href="/" color={props.theme.primaryDark}>
                    Read more about us <BsArrowRight />
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
    min-height: 45vh;
    max-height: 45vh;
    overflow: auto;
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
