import { axiosInstance } from "../core/helpers/axiosInterceptor";
import { axiosInstanceSSR } from "../core/helpers/axiosInterceptorSSR";

export const onAddStory = (payload) => {
  return axiosInstance.post("/story", payload);
};

export const onUpdateStory = (id, payload) => {
  return axiosInstance.patch("/story/" + id, payload);
};

export const onDeleteStory = (id) => {
  return axiosInstance.delete("/story/" + id);
};

export const onReadMineStory = () => {
  return axiosInstance.get("/story/mine");
};

export const onReadOneStory = (id_slug) => {
  //id or slug
  return axiosInstance.get("/story/" + id_slug);
};

export const onReadOneStorySSR = (id_slug) => {
  //id or slug
  return axiosInstanceSSR.get("/story/" + id_slug);
};
