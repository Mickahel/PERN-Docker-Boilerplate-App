import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import RoundLoader from "./components/RoundLoader";
import "./sass/main.scss";
ReactDOM.render(
  <Suspense fallback={<RoundLoader />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);

//navigator.serviceWorker.ready.then((registration) => registration.update());
//navigator.serviceWorker.register('/sw.js').then(reg => {
// sometime later…
//  reg.update();
//  });
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
