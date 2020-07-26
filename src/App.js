import React from 'react';
import { withTranslation } from 'react-i18next';
import i18n from 'i18n'
import { BrowserRouter as Router } from 'react-router-dom'
import Provider from './contexts/Provider'
import Routes from 'routes'
import MUIThemeHandler from './components/MUIThemeHandler'
import { LocalizationProvider } from '@material-ui/pickers';
import MomentUtils from '@material-ui/pickers/adapter/moment';
import './css/tailwind.css'
import './i18n';
import StandardNotification from 'components/StandardNotification';
import StandardDialog from 'components/StandardDialog';
import moment from "moment";

// ?  Moment translations
import "moment/locale/it";

//? -----------------------mobile detenction
const MobileDetect = require('mobile-detect')
const md = new MobileDetect(window.navigator.userAgent)
window.md = md

function App(props) {

  moment.locale(localStorage.getItem("i18nextLng").split("-")[0]); //? it is required to select default locale manually
  
  return (
    <LocalizationProvider dateLibInstance={moment} dateAdapter={MomentUtils} locale={i18n.language.split("-")[0]}>
      <Router>
        <Provider>
          <MUIThemeHandler >
            <Routes />
            <StandardNotification />
            <StandardDialog />
          </MUIThemeHandler>
        </Provider>
      </Router>
    </LocalizationProvider >
  );
}

/*  const currencyAPIOptions = {
    url: "/ticker",
    method: "GET",
    addHeaders: false,
  };

  
  const { data,fetch, loading, error } = useFetcher(currencyAPIOptions);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!loading && (
          <ul>
            {Object.keys(data).map((key) => {
              return (
                <li className="bulletPoint" key={key}>
                  <p>{key}:</p>
                  <p> {data[key].last}</p>
                </li>
              );
            })}
          </ul>
        )}
      </header>
    </div>
  );*/

  
App = withTranslation()(App)
export default App;
