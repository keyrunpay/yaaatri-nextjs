import { axiosInstance } from "../core/helpers/axiosInterceptor";

export const onLoginWithGoogle = (token) =>
  axiosInstance.post("/auth/login/google", { token });
