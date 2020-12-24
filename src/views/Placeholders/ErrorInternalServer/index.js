import React, { useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import { Trans } from "react-i18next";
import { useHistory } from "react-router-dom";
import "sass/placeholders.scss";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import Typography from "@material-ui/core/Typography";
function ErrorInternalServer(props) {
  const themeContext = useContext(ThemeContext);
  const history = useHistory();

  useEffect(() => {
    themeContext.setTitle("placeholder.errorInternalServer");
  }, []);

  const pushInsideApp = () => {
    const usp = new URLSearchParams(props.location.search);
    const returnUrl = usp.get("returnUrl");
    if (returnUrl) history.push(returnUrl);
    else history.push("/");
  };

  return (
    <div className="error-page placeholder internal-server-error">
      <img
        width="250px"
        src="/img/placeholders/internalServerError.svg"
        alt="500 Internal Server Error"
        className="error-image"
      />
      <Typography variant="h5" gutterBottom className="error-text">
        <Trans>placeholder.errorInternalServer</Trans>
      </Typography>
      <Button
        onClick={pushInsideApp}
        color="primary"
        variant="contained"
        component={Button}
        className="error-button"
      >
        <Trans>placeholder.backToHomepage</Trans>
      </Button>
    </div>
  );
}

export default ErrorInternalServer;
