import React from "react";
import { createGlobalStyle } from "styled-components";
import { respond, fonts, colors } from "../styles";

export default function GlobalStyles() {
    return <StylesConatiner />;
}
const StylesConatiner = createGlobalStyle`
  *,
  *::after,
  *::before{
      margin: 0;
      padding: 0;
      box-sizing: inherit;
      line-height: inherit;
      scrollbar-width: none;
      ::-webkit-scrollbar{display: none;}
      font-family: inherit;
      
  }
  html{
      font-size: 40%;
      box-sizing: border-box;
      font-family: ${fonts.text};
      ${(props) => respond("xs", `font-size:30%;`)}
      ${(props) => respond("s", `font-size:50%;`)}
      ${(props) => respond("m", `font-size:55%;`)}
      ${(props) => respond("l", `font-size:60%;`)}
      ${(props) => respond("xl", `font-size:62.5%;`)}
      ${(props) => respond("xxl", `font-size:65%;`)}
      ${(props) => respond("tv", `font-size:100%;`)}
      line-height: 1.3;
      ${() => respond("m", "line-height: 1.6;")};
  }
  body{
      overflow-x: hidden;
  }
  a{
      text-decoration: none;
      color:inherit;
  }
  button{
      cursor: pointer;
      &:active,:focus{
          outline: none;
      }
  }
  button, input, textarea{
      border: none;
      border-radius: 5px;
  }
  input, textarea{
      &:active, :focus{
        outline: none;
        box-shadow: 0 0 5px ${colors.primary};
      }
  }
`;
