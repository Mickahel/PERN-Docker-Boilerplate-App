import React from "react";
import { withTranslation } from "react-i18next";
import i18n from "i18n";
import { BrowserRouter as Router } from "react-router-dom";
import Provider from "./contexts/Provider";
import Routes from "routes";
import MUIThemeHandler from "./components/MUIThemeHandler";
import "./i18n";
import SnackBar from "components/SnackBar";
import StandardDialog from "components/StandardDialog";
import ErrorBoundary from "components/ErrorBoundary";
import yupConfig from "auxiliaries/yupConfig";
import { Settings } from "luxon";
//? -----------------------mobile detenction
const MobileDetect = require("mobile-detect");
const md = new MobileDetect(window.navigator.userAgent);
let locale = window.navigator.userLanguage || window.navigator.language;
window.md = md;

function App() {
  Settings.defaultLocale = localStorage.getItem("i18nextLng").split("-")[0] || locale

  yupConfig();
  return (
    <ErrorBoundary>
      <Provider>
        <Router>
          <MUIThemeHandler>
            <Routes />
            <SnackBar />
            <StandardDialog />
          </MUIThemeHandler>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}
App = withTranslation()(App);
export default App;
