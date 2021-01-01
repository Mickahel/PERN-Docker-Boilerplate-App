import React from "react";
import { withTranslation } from "react-i18next";
import i18n from "i18n";
import { BrowserRouter as Router } from "react-router-dom";
import Provider from "./contexts/Provider";
import Routes from "routes";
import MUIThemeHandler from "./components/MUIThemeHandler";
//import { LocalizationProvider } from "@material-ui/pickers";
//import MomentUtils from "@material-ui/pickers/adapter/moment";
import "./i18n";
import SnackBar from "components/SnackBar";
import StandardDialog from "components/StandardDialog";
import moment from "moment";
import ErrorBoundary from "components/ErrorBoundary";
import yupConfig from "auxiliaries/yupConfig";
// ?  Moment translations
import "moment/locale/it";
//? -----------------------mobile detenction
const MobileDetect = require("mobile-detect");
const md = new MobileDetect(window.navigator.userAgent);
let locale = window.navigator.userLanguage || window.navigator.language;
window.md = md;

function App() {

  moment.locale(localStorage.getItem("i18nextLng").split("-")[0] || locale); //? it is required to select default locale manually
  yupConfig();
  return (
    <ErrorBoundary>
      {/* <LocalizationProvider
        dateLibInstance={moment}
        dateAdapter={MomentUtils}
        locale={i18n.language.split("-")[0]}
     >*/}
      <Provider>
        <Router>
          <MUIThemeHandler>
            <Routes />
            <SnackBar />
            <StandardDialog />
          </MUIThemeHandler>
        </Router>
      </Provider>
      {/*</LocalizationProvider>
      */}
    </ErrorBoundary>
  );
}
App = withTranslation()(App);
export default App;
