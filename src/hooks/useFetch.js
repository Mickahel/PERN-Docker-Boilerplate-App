import React, { useContext, useState, useEffect, useCallback } from "react";
import _ from "lodash";
import axios from "axios";
import qs from "qs";
import UrlPattern from "url-pattern";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import Endpoints from "Endpoints";
// ? https://www.npmjs.com/package/qs
// ? https://www.npmjs.com/package/url-pattern

function useFetcher(props) {
  const history = useHistory();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(_.get(props, "initialLoading", true));
  const [data, setData] = useState();
  const themeContext = useContext(ThemeContext);
  const counter = React.useRef({});

  useEffect(() => {
    if (Array.isArray(props)) fetchAll(props);
    else if (typeof props == "object") fetch(props);
  }, []);

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

  const createAxiosGateway = useCallback((options) => {
    const addHeaders = _.get(options, "addHeaders", true);
    const redirectToPage500 = _.get(options, "redirectToPage500", false);
    const showErrorSnackBar = _.get(options, "showErrorSnackBar", true);
    const redirectToLogin = _.get(options, "redirectToLogin", true);
    const addBaseUrl = _.get(options, "addBaseUrl", true);
    const addHeadersForFiles = _.get(options, "addHeadersForFiles", false);
    const CORSHeaders =
      addHeaders == true
        ? {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "X-Requested-With, Content-Type, Accept, Set-Cookie",
          "Access-Control-Allow-Methods":
            "GET, PUT, POST, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Credentials": "true",
        }
        : {};

    const headers = {
      accept: "application/json",
      "Content-Type": "application/json", //"application/x-www-form-urlencoded" "multipart/form-data or" "text/plain" "application/json"
      ...CORSHeaders,
      ...(addHeadersForFiles && { "Content-Type": "multipart/form-data" }),
    };

    // ? Create custom axios instance
    const axiosGateway = axios.create({
      baseURL: addBaseUrl == true ? process.env.REACT_APP_API_URL : null,
      timeout: 30000,
      json: true,
      headers,
      withCredentials: true,
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
        return response;
      },
      (err) => {
        //console.log(err.response)
        if (
          err?.response?.status === 401 ||
          err?.response?.status === 403 ||
          err?.response?.status === 404
        ) {
          if (
            err.response.data.message == "User is not authorized" ||
            err.response.data.message == "Token expired"
          ) {
            const fetchToken = async () => {
              try {
                await fetch({
                  method: "POST",
                  url: Endpoints.auth.token,
                  setData: false,
                });
                let apiFetched = await fetch({
                  ...err.config,
                  sendRaw: true,
                });
                return apiFetched;
              } catch (e) {
                if (redirectToLogin)
                  history.push("/auth?returnUrl=" + history.location.pathname);
                throw err;
              }
            };
            return fetchToken();
          }
          else if (err.response.data.message == "User doesn't have right permission") themeContext.showErrorSnackbar({ message: "apiErrors.userDoesntHaveRightPermission" })
          else if (err.response.data.message == "You don't have the permission due to your user role") themeContext.showErrorSnackbar({ message: "apiErrors.youDontHaveThePermissionDueToYourUserRole" })
          else if (err.response.data.message == "RefreshToken Not Found") {
            if (
              history.location.pathname != "/" &&
              !history.location.pathname.includes("/auth")
            )
              themeContext.showWarningSnackbar({
                message: "apiErrors.loginAgain",
              });
            throw err;
          } else {
            throw err;
          }
        } else if (
          counter.current[err.config.url + JSON.stringify(err.config.data)] >= 3
        ) {
          if ((err.response?.status == 500 || err.message.toString() == "Network Error") && redirectToPage500 === true) history.push("/error/500?returnUrl=" + history.location.pathname);
          if ((err.response?.status == 500 || err.message.toString() == "Network Error") && redirectToPage500 === false && showErrorSnackBar === true) themeContext.showErrorSnackbar({ message: "somethingWentWrong" });
          if (err.message.toString() == "Network Error" && redirectToPage500 == false) themeContext.showErrorSnackbar({ message: "apiErrors.networkError" });

          throw err;
        } else {
          if (err.response?.status == 400) themeContext.showErrorSnackbar({ message: "validationError" })
          throw err;
        }
      }
    );

    return axiosGateway;
  }, []);

  const fetchAll = useCallback(async (options) => {
    setLoading(true);
    let apiData;
    let apiErrors;
    await Promise.all(
      options.map(async (singleRequest) => {
        try {
          singleRequest.setData = false;
          singleRequest.setError = false;
          singleRequest.setLoading = false;
          let resultFetch = await fetch(singleRequest);
          if (!apiData) apiData = {};
          apiData[singleRequest.name] = resultFetch;
        } catch (err) {
          if (!apiErrors) apiErrors = {};
          apiErrors[singleRequest.name] = err;
        }
      })
    );
    setData(apiData);
    setError(apiErrors);
    setLoading(false);
    return {
      data: apiData,
      error: apiErrors,
    };
  }, []);

  const fetchPaginated = async (options) => {
    options.paginated = false;
    options.setLoading = false;
    options.setData = false;
    options.setError = false;
    let status = "start";
    let totalResult;
    let totalError;
    while (status != "stop") {
      try {
        if (status != "start" && status != "stop")
          options.params = { ...options.params, ...status };
        let result = await fetch(options);
        if (!totalResult) totalResult = [];
        totalResult = totalResult.concat(result);
        if (result.next) status = result.next;
        else status = "stop";
      } catch (e) {
        if (!totalError) totalError = {};
        totalError[JSON.stringify(e.config.params)] = e;
      }
    }
    setData(totalResult);
    setError(totalError);
    setLoading(false);
    return totalResult;
  };

  const fetch = useCallback(async (options) => {
    if (options.setLoading == true) setLoading(true);
    if (!_.get(counter.current, options.url + JSON.stringify(options.data), false)) counter.current[options.url + JSON.stringify(options.data)] = 0;

    if (!(options?.data instanceof FormData) && options.file) {
      const formData = new FormData();
      formData.append(options.filename, options.file);
      options.addHeadersForFiles = true
      if (options?.data) Object.keys(options.data).forEach((key) => {

        if (Array.isArray(options.data[key])) options.data[key].map(elem => formData.append(key, elem))
        else formData.append(key, options.data[key])
      });
      options.data = formData
    }
    /*  options = {
        ...options,
        data: formData,
      };*/

    const axiosGateway = createAxiosGateway(options);
    let url = createUrl(options);
    try {
      if (options.paginated == true) fetchPaginated(options);
      else {
        let result = await axiosGateway({
          ...options,
          url,
        });
        if (options.setData != false) {
          setData(result.data);
          setLoading(false);
        }
        if (options.sendRaw == true) return result;
        else return result.data;
      }
    } catch (err) {
      if (
        err?.response?.status === 500 ||
        err.message.toString() == "Network Error"
      ) {
        if (counter.current[options.url + JSON.stringify(options.data)] < 3) {
          counter.current[options.url + JSON.stringify(options.data)] =
            counter.current[options.url + JSON.stringify(options.data)] + 1;
          await new Promise((resolve) => setTimeout(resolve, 500));
          return fetch(err.config);
        } else {
          counter.current[options.url + JSON.stringify(options.data)] = 0;
          /*if (err.message.toString() == "Network Error") {
          }*/
          if (options.setLoading != false) setLoading(false);
          if (options.setError != false) setError(err.response);
          throw err.response;
        }
      } else {
        if (options.setLoading != false) setLoading(false);
        if (options.setError != false) setError(err.response);
        throw err.response;
      }
    }
  }, []);

  return {
    loading,
    setLoading,
    data,
    error,
    fetch,
    fetchAll
  };
}

export default useFetcher;