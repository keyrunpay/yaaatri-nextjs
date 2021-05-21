import { axiosInstance } from "../core/helpers/axiosInterceptor";

export const onFileUpload = (file, sub_path, name) => {
  const fd = new FormData();
  fd.append("file", file, file?.name || "croppedimg.png");
  fd.append("name", name);
  fd.append("sub_path", sub_path);
  return axiosInstance.post("/file", fd);
};
