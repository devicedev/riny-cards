import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Navbar, Content } from './components/profile';

import GlobalStyle from './theme/globalStyles';
import Theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle/>
      <div>
        <Navbar/>
        <Content/>
      </div>
    </ThemeProvider>);
}

export default App;
