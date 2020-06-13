import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@200;300;400;500;600;700&display=swap');
  
  html {
    font-size: 62.5%;
    line-height: 1.5rem;
    font-family: 'Yanone Kaffeesatz', sans-serif;
  }
  
  body {
    overflow-x: hidden;
    background-color: ${({theme}) => theme.colors.backGroundColor};
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
`

export default GlobalStyle