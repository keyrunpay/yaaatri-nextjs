import React from "react";
import { useDispatch, useSelector } from "react-redux";
import landingSlice from "../../redux/slice/landing.slice";
import { onGetLandingPage } from "../../services/landing.service";

export default function useLanding() {
  const landing = useSelector((state) => state.landing);
  const dispatch = useDispatch();

  const fetchLanding = React.useCallback(async () => {
    dispatch(landingSlice.actions.setLoading());
    try {
      const res = await onGetLandingPage();
      dispatch(landingSlice.actions.setData(res));
    } catch (err) {
      dispatch(landingSlice.actions.setError(err));
    }
  }, []);

  return { landing, fetchLanding };
}
