import { configureStore } from "@reduxjs/toolkit";
import appSettings from "./appSettings";

export default configureStore({
  reducer: {
    appSettings,
  },
});
