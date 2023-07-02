import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./slices/generalSlice.js";
import postsSlice from "./slices/postsSlice.js";

export * from "./slices/generalSlice";
export * from "./slices/postsSlice";

const store = configureStore({
  reducer: {
    generalSlice,
    postsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
