import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    width: 100%;
    height: 100%;
  }

  body {
    background-color: ${({ theme }) => theme.color.systemWhite};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    font-family: Poppins, NotoSansKR, Apple SD Gothic NEO, fantasy;
    text-decoration: none;
    scrollbar-width: thin;
  }

  :root {
    --border-radius-small: 4px;
    --default-delay: 0.3s;
  }
`;

export default GlobalStyle;
