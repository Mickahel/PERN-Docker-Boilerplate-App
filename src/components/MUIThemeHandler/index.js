import React, { useContext } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import config from "configuration/config";
function MUIThemeHandler(props) {
  useContext(ThemeContext);

  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "light");

  let muithemeConfig = {
    typography: {
      fontFamily: `"Comfortaa", "Roboto", "Helvetica", "Arial", sans-serif`,
    },
    palette: {
      type: localStorage.getItem("theme"),
      primary: {
        main: config.palette.primaryColor,
        ...(config.theme.forceTextColor && {
          contrastText:
            localStorage.getItem("theme") == "light"
              ? config.theme.forceTextColor.light
              : config.theme.forceTextColor.dark,
        }),
      },
      secondary: {
        main: config.palette.secondaryColor,
      },
    },
  };

  return (
    <ThemeProvider theme={createMuiTheme(muithemeConfig)}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

export default MUIThemeHandler;
