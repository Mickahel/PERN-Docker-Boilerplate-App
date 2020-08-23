import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import RoundLoader from "./components/RoundLoader";
import "./sass/main.scss";
ReactDOM.render(
  <Suspense fallback={<RoundLoader agent="suspense"/>}>
    <App />
  </Suspense>,
  document.getElementById("root")
);