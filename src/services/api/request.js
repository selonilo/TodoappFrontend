import { stateError } from "./errors";
import * as paths from "./paths";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { useHistory } from "react-router-dom";

const axios = require("axios").default;
axios.defaults.timeout = 300000;
axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.headers.common["Accept-Language"] = "tr-TR";
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (!config.url.includes("public")) {
    config.headers.Authorization = token ? `${token}` : "";
  }

  return config;
});

const refreshAuthLogic = () =>
  axios
    .post(paths.refresh, {
      refreshToken: localStorage.getItem("refreshToken"),
    })
    .then((tokenRefreshResponse) => {
      if (tokenRefreshResponse) {
        localStorage.setItem("token", tokenRefreshResponse.data.accessToken);
        localStorage.setItem("refreshToken", tokenRefreshResponse.data.refreshToken);

        return Promise.resolve();
      }
    })
    .catch(() => {
      localStorage.clear();
      useHistory().push("/login");
    });

createAuthRefreshInterceptor(axios, refreshAuthLogic);

class request {
  static async get(url = "", params = {}, headers = {}) {
    try {
      return await axios.get(url, { params, headers });
    } catch (error) {
      return stateError(error);
    }
  }

  static async post(url = "", body = {}, params = {}, headers = {}) {
    try {
      return await axios.post(url, body, { params, headers });
    } catch (error) {
      return stateError(error);
    }
  }

  static async put(url = "", body = {}, headers = {}) {
    if (Object.keys(body).length !== 0) {
      let params = this.setParams({ params: body });
      url = url + "?" + params;
    }

    try {
      return await axios.put(url, body, { headers });
    } catch (error) {
      return stateError(error);
    }
  }

  static async delete(url = "", data = {}, headers = {}) {
    try {
      return await axios.delete(url, { data, headers });
    } catch (error) {
      return stateError(error);
    }
  }

  static setParams({ url, params }) {
    return Object.entries(params)
      .map((e) => e.join("="))
      .join("&");
  }
}

export default request;
