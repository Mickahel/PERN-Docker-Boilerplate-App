import React, { useState, useEffect, useContext } from "react";
import config from "configuration/config";
import Helmet from "react-helmet";
import { Trans, useTranslation } from "react-i18next";
import "./style.scss";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import * as Yup from "yup";
import useFetch from "hooks/useFetch";
import Endpoints from "Endpoints";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import { UserContext } from "contexts/Providers/UserProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

function Activation(props) {
  let history = useHistory();
  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);
  const [t, i18n] = useTranslation();
  const { fetch, loading, error } = useFetch();
  const [activationStatus, setActivationStatus] = useState("ACTIVATION");

  const pushInsideApp = () => {
    const usp = new URLSearchParams(props.location.search);
    const returnUrl = usp.get("returnUrl");
    if (returnUrl) history.push(returnUrl);
    else history.push("/");
  };

  const loadData = async () => {
    setActivationStatus("ACTIVATION");
    try {
      await fetch({
        url: Endpoints.auth.activation,
        urlParams: {
          activationCode: props.match.params.activationCode,
        },
        method: "POST",
      });
      setActivationStatus("ACTIVATED");
    } catch (e) {
      setActivationStatus("ERROR");
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div id="activation">
      <Helmet title={`${config.name.short} - ${t("auth.activation.title")}`} />

      <div id="activationForm">
        <img
          width="300px"
          className="mb-5 self-center"
          src={process.env.PUBLIC_URL + "/img/logos/longLogo.svg"}
          alt="Main logo"
        />
        <Typography align="center" variant="h3" gutterBottom>
          <Trans>auth.activation.title</Trans>
        </Typography>
        {activationStatus == "ACTIVATING" && (
          <>
            <Typography align="center" variant="body1" gutterBottom>
              <Trans>auth.activation.activatingText</Trans>
            </Typography>
            <div className="flex justify-center mt-5">
              <CircularProgress color="primary" size={75} />
            </div>
          </>
        )}
        {activationStatus == "ACTIVATED" && (
          <>
            <Typography align="center" variant="body1" gutterBottom>
              <Trans>auth.activation.activatedText</Trans>
            </Typography>
            <img
              width="100px"
              className="mt-5 mb-10 self-center"
              src={process.env.PUBLIC_URL + "/img/tick.svg"}
              alt="Confirm Image"
            />
            <div className="flex justify-center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  pushInsideApp();
                }}
              >
                <Trans>auth.activation.goToApp</Trans>
              </Button>
            </div>
          </>
        )}
        {activationStatus == "ERROR" && (
          <>
            <Typography align="center" variant="body1" gutterBottom>
              <Trans>{`auth.activation.${error.data.message}`}</Trans>
            </Typography>
            <img
              width="100px"
              className="mt-5 mb-10 self-center"
              src={process.env.PUBLIC_URL + "/img/cross.svg"}
              alt="Confirm Image"
            />
            <div className="flex justify-center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  loadData();
                }}
              >
                <Trans>auth.activation.retry</Trans>
              </Button>
            </div>
          </>
        )}
        <div id="auxiliaryLinks">
          <span className="mr-1">
            <Trans>auth.alreadyHaveAnAccount</Trans>
          </span>
          <Link href="/auth/login" vcolor="primary">
            <Trans>auth.login</Trans>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Activation;
