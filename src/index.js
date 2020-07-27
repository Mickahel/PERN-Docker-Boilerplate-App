import React, { Suspense } from "react";
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

/*serviceWorker.register({
  onUpdate: function () {
    if (alert(`New content is available!. Click OK to refresh`)) {
      window.location.reload();
    }
    let event = new Event("app-update");
    window.dispatchEvent(event);
  },
});
*/