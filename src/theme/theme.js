import { createTheme } from "@material-ui/core";

export const THEME = createTheme({
  typography: {
    fontFamily: `Nunito Sans`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
  primary: {
    main: "#5285EC"
  },
  secondary: {
    main: "grey"
  },
  overrides: {
    MuiButton: {
      contained: {
        color: "white",
        backgroundColor: "#5285EC",
        "&:hover": {
          backgroundColor: "#5285EC",
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: "#5285EC"
          }
        }
      }
    }
  }
});
