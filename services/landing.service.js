import { axiosInstance } from "../core/helpers/axiosInterceptor";

export const onGetLandingPage = () => {
  return axiosInstance.get("/landing_page");
};
