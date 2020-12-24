import React, { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import "sass/placeholders.scss";
import Typography from "@material-ui/core/Typography";

function ErrorNotFound(props) {
  const themeContext = useContext(ThemeContext);
  useEffect(() => {
    themeContext.setTitle("placeholder.notFound");
  }, []);

  return (
    <div className="error-page placeholder not-found">
      <img
        width="250px"
        src="/img/placeholders/notFound.svg"
        alt="404 Page Not Found"
        className="error-image"
      />
      <Typography variant="h5" gutterBottom className="error-text">
        <Trans>placeholder.cannotFindPage</Trans>
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

export default ErrorNotFound;
