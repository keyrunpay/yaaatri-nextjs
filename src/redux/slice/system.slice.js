import { createSlice } from "@reduxjs/toolkit";

const initState = {
  id: "",
  role: [],
  email: "",
  image: "",
  name: "",
  isLogged: false,
};

const resetState = () => initState;

const setState = (state, action) => ({
  ...state,
  ...action.payload,
});

const systemSlice = createSlice({
  name: "system",
  initialState: initState,
  reducers: {
    resetState,
    setState,
  },
});

export default systemSlice;
