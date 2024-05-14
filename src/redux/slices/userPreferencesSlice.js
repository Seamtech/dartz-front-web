// features/userPreferencesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  panelStates: {},  // Stores boolean values for each panelId, defaulting to true
  theme: 'light',
  notifications: true,
};

const userPreferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    togglePanelState: (state, action) => {
      const { panelId } = action.payload;
      // Toggle the state of the panel, default to true if it's undefined
      state.panelStates[panelId] = state.panelStates[panelId] ? !state.panelStates[panelId] : true;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
  }
});

export const { togglePanelState, setTheme, toggleNotifications } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
