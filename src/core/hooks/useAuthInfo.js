import { useSelector } from "react-redux";

export default function useAuthInfo() {
  const user = useSelector((state) => state.system);
  return user;
}
