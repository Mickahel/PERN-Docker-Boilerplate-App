import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import useFetcher from "./useFetcher";

function App() {
  const currencyAPIOptions = {
    url: "/ticker",
    method: "GET",
    addHeaders: false,
  };

  
  const { data,fetch, loading, error } = useFetcher(currencyAPIOptions);
  const handleClick = async () =>{
    try {
      let postResult = await fetch({
        method: "POST",
        addBaseUrl:false,
        url:"https://jsonplaceholder.typicode.com/posts",
        body:{
          title: "banana",
          body:"this is a banana",
          userId:156
        }
      })
      console.log(postResult)
      let getResult = await fetch({
        method: "GET",
        addBaseUrl:false,
        url:`https://jsonplaceholder.typicode.com/posts/${postResult.data.id}`,
      })
      console.log(getResult)
    }catch(e){
      console.log(e)
    }
  }
  //const {data, loading, error } = useFetcher([api1Options, api2Options]);
  //console.log("Data", data);
  //console.log("Error", error);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={()=>{handleClick()}}>Click me</button>
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
  );
}

export default App;
