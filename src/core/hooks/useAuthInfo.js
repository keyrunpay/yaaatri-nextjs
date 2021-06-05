import { useSelector } from "react-redux";

export default function useAuthInfo() {
  const user = useSelector((state) => state.system);
  const isEditor = user?.role?.includes("editor");

  return { ...user, isEditor };
}
