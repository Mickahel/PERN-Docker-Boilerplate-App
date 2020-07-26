import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import axios from "axios";
import qs from "qs";
import UrlPattern from "url-pattern";
import { useHistory } from "react-router-dom";
//import { Trans } from 'react-i18next'

// ? https://www.npmjs.com/package/qs
// ? https://www.npmjs.com/package/url-pattern

function useFetcher(props) {
  const history = useHistory();
  const [error, setError] = useState();
  //const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(_.get(props, "initialLoading", true));
  const [data, setData] = useState();

  useEffect(() => {
    if (Array.isArray(props)) fetchAll(props);
    else if (typeof props == "object") fetch(props);
  }, []);

  useEffect(() => {
    if (
      data !== undefined &&
      !_.isEmpty(data)
      //|| (error !=undefined && !_.isEmpty(error))
    )
      setLoading(false);
  }, [data, error]);

  // ? if there is a UrlParams
  const createUrl = useCallback((axiosOptions) => {
    let uri = axiosOptions.url;
    if (axiosOptions.urlParams) {
      uri = new UrlPattern(axiosOptions.url).stringify(axiosOptions.urlParams);
    }

    let queryString = "";
    if (axiosOptions.query) {
      Object.keys(axiosOptions.query).forEach(
        (key) =>
          (axiosOptions.query[key] === null ||
            axiosOptions.query[key] === undefined) &&
          delete axiosOptions.query[key]
      );
      queryString = axiosOptions.query
        ? qs.stringify(axiosOptions.query, {
            addQueryPrefix: true,
            arrayFormat: "repeat",
          })
        : "";
    }

    return uri + queryString;
  }, []);


  const createAxiosGateway = useCallback((options, fetchType) => {
    const addHeaders = _.get(options, "addHeaders", true);
    const isSilent = _.get(options, "silent");
    const redirectToPage500 = _.get(options, "redirectToPage500", false);
    const showErrorSnackBar = _.get(options, "showErrorSnackBar", false);
    const addBaseUrl = _.get(options, "addBaseUrl", true);

    const CORSHeaders= addHeaders==true ? {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        crossorigin: "true",
      } : {}
    
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json", //"application/x-www-form-urlencoded" "multipart/form-data or" "text/plain" "application/json"
      ...CORSHeaders
    };

    
    // ? Get UserToken if there is one and attach to Header
    if (
      _.get(options, "useToken", true) &&
      localStorage.userToken &&
      addHeaders == true
    ) {
      headers["Authorization"] = `Bearer ${localStorage.userToken}`;
    }

    // ? Create custom axios instance
    const axiosGateway = axios.create({
      baseURL: addBaseUrl==true ? process.env.REACT_APP_API_URL : null ,
      timeout: 30000,
      json: true,
      headers,
    });
    // ? attach global headers
    if (addHeaders==false) {
      
      axiosGateway.defaults.headers.common = headers;
      axiosGateway.defaults.headers.patch = headers;
      axiosGateway.defaults.headers.post = headers;
      axiosGateway.defaults.headers.put = headers;
      axiosGateway.defaults.headers.get = headers;
      axiosGateway.defaults.headers.delete = headers;
    }

    axiosGateway.interceptors.request.use((response) => {
      if (process.env.REACT_APP_API_LOGGING === true) {
        response.meta = response.meta || {};
        response.meta.requestStartedAt = new Date().getTime();
      }
      return response;
    });

    axiosGateway.interceptors.response.use(
      (response) => {
        // ? Do something with response data
        if (process.env.REACT_APP_API_LOGGING === true)
          console.log(
            `[${fetchType}] Execution time for: ${response.config.url} - ${
              new Date().getTime() - response.config.meta.requestStartedAt
            } ms`
          );
        return response;
      },
      (err) => {
        if (err.response?.status == 500 && redirectToPage500)
          history.push("/error/500");
        //if (err.response?.status == 500 && showErrorSnackBar) themeContext.showErrorNotification({ message: <Trans>somethingWentWrong</Trans> })
        if (process.env.REACT_APP_API_LOGGING === true)
          console.log(
            `[${fetchType}] Execution time for: ${err.config.url} - ${
              new Date().getTime() - error.config.meta.requestStartedAt
            } ms`
          );
        if (err.response) {
        }
        //setError(err.response);
        throw err;
      }
    );

    return axiosGateway;
  }, []);

  const fetchAll = useCallback((options) => {
    const axiosGateway = createAxiosGateway(options, "Fetch All");
    setLoading(true);
    const requests = options.map((singleRequest) => {
      let url = createUrl(singleRequest);
      return axiosGateway({
        ...singleRequest,
        url,
      }).then(
        (response) => ({ response: response.data }),
        (err) => ({ err })
      );
    });

    return axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          let apiData = {};
          let apiErrors = {};
          responses.map((element, elementIndex) => {
            if (element.response)
              apiData[options[elementIndex].name] = element.response;
            else if (element.err)
              apiErrors[options[elementIndex].name] = element.err;
            return element;
          });
          setData(apiData);
          setError(apiErrors);
          return responses;
        })
      )
      .catch((err) => {
        //setSuccess(false);
        setError(err);
        return err;
      });
  }, []);

  const fetch = useCallback(async (options) => {
    const axiosGateway = createAxiosGateway(options, "Fetch");
    let url = createUrl(options);

    setLoading(true);
    return axiosGateway({
      ...options,
      url,
    })
      .then((result) => {
        //setSuccess(true);
        setData(result.data);
        return result;
      })
      .catch((err) => {
        //setSuccess(false);
        setError(err);
        return err;
      });
  }, []);

  return {
    loading,
    data,
    error,
    fetch,
    fetchAll
  };
}

export default useFetcher;
