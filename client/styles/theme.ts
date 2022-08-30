import * as React from 'react';
import {createTheme} from '@mui/material/styles';


export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFD4CA",
      contrastText: "#1D1717",
      light: "#fffffd",
      dark: "#cba399",
    },
    secondary: {
      main: "#F3F2F2",
      contrastText: "#262626",
      light: "#ffffff",
      dark: "#cccaca",
    },
    warning: {
      main: "#a83655",
      contrastText: "#ffffff",
      light: "#dd6781",
      dark: "#74002d",
    },
  },
});