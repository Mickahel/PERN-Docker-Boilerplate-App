import React, { lazy, useState, Suspense, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import RoutingApp from "./App";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import RoutingAuth from "./Auth";
import moment from "moment";
import i18n from "i18n";
import CookieConsentDrawer from "theme/CookieConsentDrawer";

const ErrorInternalServer = lazy(() =>
  import("views/Placeholders/ErrorInternalServer")
);
const ErrorNotAuthorized = lazy(() =>
  import("views/Placeholders/ErrorNotAuthorized")
);
const ErrorNotFound = lazy(() => import("views/Placeholders/ErrorNotFound"));
const PrivacyPolicy = lazy(() => import("views/TOS/PrivacyPolicy"));
const TermsOfService = lazy(() => import("views/TOS/TermsOfService"));



function App(props) {
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    window.addEventListener("app-update", onAppUpdate);
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  }, []);

  const onBeforeInstallPrompt = (e) => {
    if (!e) return;
    e.preventDefault();
    themeContext.setInstallEvent(e);
  };

  const onAppUpdate = () => {
    let format = "YYYY-MM-DD HH:mm:ss";
    if (localStorage.updateDialogLastShown) {
      let date = moment(localStorage.updateDialogLastShown, format)
      if (moment().diff(date, "minute") < 1) return
    }
    localStorage.updateDialogLastShown = moment().format(format)
    themeContext.showInfoDialog({
      title: i18n.t("newUpdateAlert.title"),
      message: i18n.t("newUpdateAlert.message"),
      onClose: () => {
        window.location.reload();
      },
    });
  };


  return (
    <span>
      <CookieConsentDrawer />
      <Switch>
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/error/404" component={ErrorNotFound} />
        <Route path="/error/401" component={ErrorNotAuthorized} />
        <Route path="/error/403" component={ErrorNotAuthorized} />
        <Route path="/error/500" component={ErrorInternalServer} />
        <Route path="/auth*" component={RoutingAuth} />
        <Route path="/*" component={RoutingApp} />
      </Switch>
    </span>
  );
}

export default App;
