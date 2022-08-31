import * as React from 'react';
import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
  palette: {
    neutral: {
      main: "#e8fce2",
      contrastText: "#000000",
      light: "#ffffff",
      dark: "#b6c9b0",
    },
    accent: {
      main: "#A3F7B5",
      contrastText: "#000000",
      light: "#d6ffe7",
      dark: "#71c485",
    },
    warning: {
      main: "#c94067",
      contrastText: "#ffffff",
      light: "#ff7395",
      dark: "#93003d",
    },
    primary: {
      main: "#664147",
      contrastText: "#ffffff",
      light: "#956c72",
      dark: "#3a1920",
    },
    secondary: {
      main: "#2F9C95",
      contrastText: "#000000",
      light: "#67cdc5",
      dark: "#006d67",
    }
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    neutral : Palette['primary'];
    accent : Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral? : PaletteOptions['primary'];
    accent? : PaletteOptions['primary'];
  }
}
