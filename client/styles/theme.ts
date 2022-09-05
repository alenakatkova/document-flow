import * as React from 'react';
import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
  palette: {
    neutral: {
      main: "#f7f7f7",
      contrastText: "#484848",
      light: "#ffffff",
      dark: "#cccccc",
    },
    accent: {
      main: "#DFF3E3",
      contrastText: "#2A2A2A",
      light: "#ffffff",
      dark: "#d9ecdc",
    },
    warning: {
      main: "#7c0c30",
      contrastText: "#ffffff",
      light: "#b04259",
      dark: "#4a0007",
    },
    primary: {
      main: "#0C7C59",
      contrastText: "#ffffff",
      light: "#4bac86",
      dark: "#004f30",
    },
    secondary: {
      main: "#0c307c",
      contrastText: "#ffffff",
      light: "#4a59ac",
      dark: "#000a4f",
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
