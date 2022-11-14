import { createSlice } from "@reduxjs/toolkit";

export const appSettings = createSlice({
  name: "appSettings",
  initialState: {
    language: {
      key: "en",
      title: "🇺🇸 English",
      dir: "ltr",
    },
    languages: [
      {
        key: "en",
        title: "🇺🇸 English",
        dir: "ltr",
      },
      {
        key: "fa",
        title: "🇮🇷 Persian",
        dir: "rtl",
      },
      {
        key: "tr",
        title: "🇹🇷 Türkiye",
        dir: "ltr",
      },
    ],
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = appSettings.actions;

export default appSettings.reducer;
