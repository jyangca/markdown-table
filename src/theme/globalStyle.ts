import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    width: 100%;
    height: 100%;
  }

  body {
    background-color: ${({ theme }) => theme.color.system1};
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

  mark {
    background: #333849;
    border-radius: 2px;
    padding: 4px 4px;
    color: white;
    font-size: 0.9375rem;
    margin: 2px;
  }
`;

export default GlobalStyle;
