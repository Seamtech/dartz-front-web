import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    history: [], // Initialize history as an empty array
  },
  reducers: {
    pushToHistory: (state, action) => {
      // Add new path to history, but limit length to 3
      if (state.history.includes(action.payload)) return; // Prevent duplicates
      state.history.push(action.payload);
      if (state.history.length > 3) {
        state.history = state.history.slice(-3);
      }
    },
    setBreadcrumbHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { pushToHistory, setBreadcrumbHistory } = navigationSlice.actions;
export default navigationSlice.reducer;
