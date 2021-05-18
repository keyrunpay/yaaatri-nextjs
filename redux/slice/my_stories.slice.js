import { createSlice } from "@reduxjs/toolkit";

const initState = {
  status: "idle",
  data: null,
};

const resetState = () => initState;

const setLoading = (_, __) => ({
  status: "loading",
  data: null,
});

const setData = (_, action) => ({
  status: "data",
  data: action.payload,
});

const setError = (_, action) => ({
  status: "error",
  data: action.payload,
});

const myStorySlice = createSlice({
  name: "my_stories",
  initialState: initState,
  reducers: {
    resetState,
    setLoading,
    setData,
    setError,
  },
});

export default myStorySlice;
