import React, { useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import "sass/placeholders.scss";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import Typography from "@material-ui/core/Typography";
import "sass/placeholders.scss";

function ErrorNotAuthorized(props) {
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    themeContext.setTitle("placeholder.youAreNotAuthorized");
  }, []);

  return (
    <div className="error-page placeholder internal-server-error">
      <img
        width="250px"
        src="/img/placeholders/unauthorized.svg"
        alt="Not Authorized"
        className="error-image"
      />
      <Typography variant="h5" gutterBottom className="error-text">
        <Trans>placeholder.youAreNotAuthorized</Trans>
      </Typography>
      <Link
        to="/"
        color="primary"
        variant="contained"
        component={Button}
        className="error-button"
      >
        <Trans>placeholder.backToHomepage</Trans>
      </Link>
    </div>
  );
}

export default ErrorNotAuthorized;
