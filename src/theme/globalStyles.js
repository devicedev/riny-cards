import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
    line-height: 1.5rem;
    font-family: 'Roboto', sans-serif;
    
    @media (min-width: 320px) and (max-width: 480px) {
    
    }
    @media (min-width: 481px) and (max-width: 767px) {
      
    }
    @media (min-width: 768px) and (max-width: 1024px) {
  
    }
    @media (min-width: 1025px) and (max-width: 1280px) {
      
    }
    @media (min-width: 1281px) {
      
    }
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
  .Toastify__toast--success,
  .Toastify__toast--info,
  .Toastify__toast--error {
    font-size: 1.5rem;
    border-radius: 10px;
    filter: brightness(110%);
  }
`