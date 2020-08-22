import React, { useContext, useState, useEffect, useCallback } from "react";
import _ from "lodash";
import axios from "axios";
import qs from "qs";
import UrlPattern from "url-pattern";
import { useHistory } from "react-router-dom";
//import { Trans } from 'react-i18next'
import { ThemeContext } from 'contexts/Providers/ThemeProvider'
import useCookies from 'react-cookie'
import Cookies from 'js-cookie'
// ? https://www.npmjs.com/package/qs
// ? https://www.npmjs.com/package/url-pattern

function useFetcher(props) {
  const history = useHistory();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(_.get(props, "initialLoading", true));
  const [data, setData] = useState();
  const themeContext = useContext(ThemeContext)
  useEffect(() => {
    if (Array.isArray(props)) fetchAll(props);
    else if (typeof props == "object") fetch(props);
  }, []);

  useEffect(() => {
    if (data !== undefined && _.isEmpty(data)
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
    const redirectToPage500 = _.get(options, "redirectToPage500", false);
    const showErrorSnackBar = _.get(options, "showErrorSnackBar", true);
    const addBaseUrl = _.get(options, "addBaseUrl", true);

    const CORSHeaders = addHeaders == true ? {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept, Set-Cookie",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    } : {}

    const headers = {
      accept: "application/json",
      "Content-Type": "application/json", //"application/x-www-form-urlencoded" "multipart/form-data or" "text/plain" "application/json"
      ...CORSHeaders
    };


    // ? Get UserToken if there is one and attach to Header
    if (
      _.get(options, "useToken", true) &&
      Cookies.get("accessToken") &&
      addHeaders == true
    ) headers["Authorization"] = `Bearer ${Cookies.get("accessToken")}`;
    

    // ? Create custom axios instance
    const axiosGateway = axios.create({
      baseURL: addBaseUrl == true ? process.env.REACT_APP_API_URL : null,
      timeout: 30000,
      json: true,
      headers,
      withCredentials:true
    });
    // ? attach global headers
    if (addHeaders == false) {
      axiosGateway.defaults.headers.common = headers;
      axiosGateway.defaults.headers.patch = headers;
      axiosGateway.defaults.headers.post = headers;
      axiosGateway.defaults.headers.put = headers;
      axiosGateway.defaults.headers.get = headers;
      axiosGateway.defaults.headers.delete = headers;
      axiosGateway.defaults.withCredentials = true;
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
        if (process.env.REACT_APP_API_LOGGING === true) console.log(`[${fetchType}] Execution time for: ${response.config.url} - ${new Date().getTime() - response.config.meta.requestStartedAt} ms`);
        return response;
      },
      (err) => {
        if (process.env.REACT_APP_API_LOGGING === true) console.log(`[${fetchType}] Execution time for: ${err.config.url} - ${new Date().getTime() - err.config.meta.requestStartedAt} ms`);
        if (err.response?.status == 500 && redirectToPage500) history.push("/error/500");
        if (err.response?.status == 500 && showErrorSnackBar) themeContext.showErrorNotification({ message: "somethingWentWrong" })
        if (err.response) {
        }
        setError(err.response);
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
        setData(result.data);
        return result.data;
      })
      .catch((err) => {
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