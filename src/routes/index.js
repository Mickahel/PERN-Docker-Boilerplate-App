import React, { lazy, useState, Suspense, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import RoutingApp from "./App";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import RoutingAuth from "./Auth";
import i18n from "i18n";
import CookieConsentDrawer from "theme/CookieConsentDrawer";
import { DateTime } from "luxon";

const ErrorInternalServer = lazy(() =>
  import("views/Placeholders/ErrorInternalServer")
);
const ErrorNotAuthorized = lazy(() =>
  import("views/Placeholders/ErrorNotAuthorized")
);
const ErrorNotFound = lazy(() => import("views/Placeholders/ErrorNotFound"));
const PrivacyPolicy = lazy(() => import("views/TOS/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("views/TOS/TermsAndConditions"));



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
    let format = "yyyy-LL-dd hh:mm:ss";
    if (localStorage.updateDialogLastShown) {
      let date = DateTime.fromFormat(localStorage.updateDialogLastShown, format)
      if (DateTime.local().diff(date, "minute").toObject().minutes < 1) return
    }
    localStorage.updateDialogLastShown = DateTime.local().toFormat(format)
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
        <Route path="/terms-and-conditions" component={TermsAndConditions} />
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
