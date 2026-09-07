import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  platforms: [
    {
      id: 1,
      name: "Instagram",
      connected: true,
    },
    {
      id: 2,
      name: "Facebook",
      connected: true,
    },
    {
      id: 3,
      name: "Twitter",
      connected: false,
    },
  ],
};

const platformsSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {
    addPlatform: (state, action) => {
      state.platforms.push(action.payload);
    },

    deletePlatform: (state, action) => {
      state.platforms = state.platforms.filter(
        (platform) => platform.id !== action.payload
      );
    },

    togglePlatform: (state, action) => {
      const platform = state.platforms.find(
        (platform) => platform.id === action.payload
      );

      if (platform) {
        platform.connected = !platform.connected;
      }
    },
  },
});

export const {
  addPlatform,
  deletePlatform,
  togglePlatform,
} = platformsSlice.actions;

export default platformsSlice.reducer;