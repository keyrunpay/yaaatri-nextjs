import { configureStore } from "@reduxjs/toolkit";
import landingSlice from "./slice/landing.slice";
import myStorySlice from "./slice/my_stories.slice";
import systemSlice from "./slice/system.slice";

const store = configureStore({
  reducer: {
    system: systemSlice.reducer,
    my_stories: myStorySlice.reducer,
    landing: landingSlice.reducer,
  },
});

export default store;
