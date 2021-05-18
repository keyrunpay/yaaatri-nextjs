import React from "react";
import { useDispatch } from "react-redux";
import systemSlice from "../../redux/slice/system.slice";
import { onLoginWithGoogle } from "../../services/auth.service";
import decodeApiMessage from "../helpers/decodeApiMessage";

export default function useLogin() {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const setToReduxFromApi = React.useCallback((payload) => {
    localStorage.setItem("token", payload?.token);
    localStorage.setItem("user_data", JSON.stringify(payload?.user_data));
    dispatch(
      systemSlice.actions.setState({ ...payload?.user_data, isLogged: true })
    );
  }, []);

  const setToReduxFromLS = React.useCallback(() => {
    const token = localStorage.getItem("token");
    const user_data = localStorage.getItem("user_data");
    if (!!token & !!user_data) {
      const parsed_data = JSON.parse(user_data);
      dispatch(
        systemSlice.actions.setState({
          ...parsed_data,
          isLogged: true,
        })
      );
    }
  }, []);

  const doLogin = React.useCallback(
    async (token) => {
      console.log(token);
      setLoading(true);
      try {
        const res = await onLoginWithGoogle(token);
        setLoading(false);
        setToReduxFromApi(res);
      } catch (err) {
        console.log("error login", decodeApiMessage(err));
        setLoading(false);
      }
    },
    [setToReduxFromApi, setLoading]
  );

  const doLogout = React.useCallback(() => {
    dispatch(systemSlice.actions.resetState());
    localStorage.clear();
  }, []);

  return { doLogin, doLogout, setToReduxFromLS, loading };
}
