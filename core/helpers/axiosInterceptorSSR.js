import Axios from "axios";
import http from "../constants/http";

export const axiosInstanceSSR = Axios.create({
  timeout: 10000,
  baseURL: http.BASE_URL,
});

axiosInstanceSSR.interceptors.response.use(
  //handle on success
  function (response) {
    return response.data || null;
  },

  //handle on error
  function (error) {
    if (error.response && error.response.data) {
    } else {
      return Promise.reject({
        message: "Some unusual error occured, please try again",
      });
    }
    return Promise.reject(error.response.data);
  }
);
