import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./Fonts.css";
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#AF8C55",
    },
  },
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme>
        
          <App />
        
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
