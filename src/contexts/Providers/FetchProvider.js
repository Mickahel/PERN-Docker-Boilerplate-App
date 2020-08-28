import React, { createContext, useState, useRef, useCallback } from "react"

export const FetchContext = createContext('fetch')

function FetchProvider(props) {

  const fetchedData = useRef()
  const fetchedApis = useRef([])

  const isApiAlreadyFetched = (options) => {
    if (fetchedApis.current.indexOf(options.toString()) == -1) {
      fetchedApis.current = [...fetchedApis.current, options.toString()]
      return false
    }
    return true
  }

  let promiseResolve, promiseReject;
  let x = {
    aListener: function (val) {
      console.log("yeyyyyyyyyyyyyyyy")
      if (fetchedData.current) promiseResolve(fetchedData.current)
    },
    set a(val) {
      fetchedData.current = val;
      this.aListener(val);
    },
    get a() {
      return fetchedData.current;
    },
    registerListener: function (listener) {
      this.aListener = listener;
    }
  }


  let fetchPromise = new Promise((resolve, reject) => {
    promiseResolve = resolve;
    promiseReject = reject;
    })

  const fetchState = {
    x,
    fetchPromise,
    isApiAlreadyFetched,
    //fetchedData,
    fetchedApis,
  }

  return (
    <FetchContext.Provider value={fetchState}>
      {props.children}
    </FetchContext.Provider>
  );
}

export default FetchProvider