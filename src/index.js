import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

//That is needed to style the material-ui components (Button for exemple)
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
//That is needed if we use react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//That is our own styling sheet
import "./styles.scss";


ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
  
);
