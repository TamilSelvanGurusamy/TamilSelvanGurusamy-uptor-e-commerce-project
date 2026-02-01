import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3b82f6"
    }
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif"
  },
  shape: {
    borderRadius: 8
  }
});

export default theme;
