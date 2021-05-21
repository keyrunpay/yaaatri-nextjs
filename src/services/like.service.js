import { axiosInstance } from "../core/helpers/axiosInterceptor";

export const onAddLike = (payload) => {
  return axiosInstance.post("/like", payload);
};
