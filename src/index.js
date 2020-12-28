import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import RoundLoader from "./components/RoundLoader";
import "./sass/main.scss";
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Suspense fallback={<RoundLoader />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
/*serviceWorkerRegistration.register({
  onSuccess: function (registration) {
    let appUpdateEvent = new Event('app-update');
    window.dispatchEvent(appUpdateEvent);
    registration.waiting.postMessage({ type: 'SKIP_WAITING' })
  }
});
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();