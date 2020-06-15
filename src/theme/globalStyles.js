import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  html {
    font-size: 62.5%;
    line-height: 1.5rem;
    font-family: 'Yanone Kaffeesatz', sans-serif;
    letter-spacing: 0.1rem;
  }
  
  body {
    overflow-x: hidden;
    background-color: ${({ theme }) => theme.colors.backGroundColor};
    padding: 0;
    margin: 0;
  }
  
  * {
    box-sizing: border-box;
  }
  
  #root {
    padding-left: 15rem;
    padding-right: 15rem;
  }
`;

export default GlobalStyle;