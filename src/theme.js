import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  textField: {
    selectColor: "#EBBA34",
  },
  palette: {
    primary: {
      light: "#2f90c2",
      main: "#2C3E50",
      dark: "#165270",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export default theme;