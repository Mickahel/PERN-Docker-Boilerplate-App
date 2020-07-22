import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import useFetcher from "./useFetcher";

function App() {
  const api1Options = {
    name: "one",
    url: "/v1/debug/status/500",
  };
  const api2Options = {
    name: "two",
    url: "/v1/debug/status/200",
  };

  const {data, loading, error } = useFetcher(api1Options);
  //const {data, loading, error } = useFetcher([api1Options, api2Options]);

  if (loading) return <img src={logo} className="App-logo" alt="logo" />;
  console.log("Data in dashboard", data)
  //console.log("DataTwo", data.two)
  console.log("error", error)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
