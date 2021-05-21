import { axiosInstance } from "../core/helpers/axiosInterceptor";

export const onAddComment = (payload) => {
  return axiosInstance.post("/comment", payload);
};

export const onAddReply = (payload) => {
  return axiosInstance.post("/comment/reply", payload);
};
