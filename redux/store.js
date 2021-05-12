import { configureStore } from "@reduxjs/toolkit";
import systemSlice from "./slice/system.slice";

const store = configureStore({
  reducer: {
    system: systemSlice.reducer,
  },
});

export default store;
