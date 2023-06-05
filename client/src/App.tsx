import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ThemeProvider, useTheme } from '@mui/material/styles';

import AppRouter from 'router/AppRouter';
import { muiTheme, queryClient } from 'configs';

function App() {
  const outerTheme = useTheme();

  return (
    <ThemeProvider theme={muiTheme(outerTheme)}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
