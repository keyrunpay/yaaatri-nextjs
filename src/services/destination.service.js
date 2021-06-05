import { axiosInstance } from "../core/helpers/axiosInterceptor";
import { axiosInstanceSSR } from "../core/helpers/axiosInterceptorSSR";

export const onAddDestinations = (payload) => {
  return axiosInstance.post("/destination", {
    ...payload,
    status: "Published",
  });
};

export const onReadAllDestinations = () => {
  return axiosInstance.get("/destination/all");
};

export const onReadOneDestination = (id_slug) => {
  //id or slug
  return axiosInstance.get("/destination/" + id_slug);
};

export const onReadOneDestinationSSR = (id_slug) => {
  //id or slug
  return axiosInstanceSSR.get("/destination/" + id_slug);
};
