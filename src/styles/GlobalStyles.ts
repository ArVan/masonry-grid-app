import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
  }
  h1 {
    font-size: 3.2em;
    line-height: 1.1;
    text-align: center;
  }
`;
