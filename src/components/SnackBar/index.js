import React, { useContext } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Trans } from "react-i18next";

function SnackBar(props) {
  const themeContext = useContext(ThemeContext);
  const history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    themeContext.hideSnackbar();
  };

  const handleClick = () => {
    const { onClick, link } = themeContext.snackbar.button;
    if (typeof onClick === "function") onClick();
    else if (link.startsWith("http")) {
      const win = window.open(link, "_blank");
      win.focus();
    } else {
      history.push(link);
    }
  };

  return (
    <Snackbar
      open={themeContext.snackbar.open}
      autoHideDuration={themeContext.snackbar.autoHideDuration}
      onClose={handleClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={themeContext.snackbar.type}
        action={
          themeContext.snackbar.button && (
            <Button color="inherit" size="small" onClick={handleClick}>
              <Trans>{themeContext.snackbar.button.text}</Trans>
            </Button>
          )
        }
      >
        <div className="flex">
          <Trans>{themeContext.snackbar.message}</Trans>
        </div>
      </MuiAlert>
    </Snackbar>
  );
}

export default SnackBar;
