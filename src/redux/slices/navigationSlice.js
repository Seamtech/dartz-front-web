//Store navigation of history of each user for creating a breadcrumb
import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    history: [],
  },
  reducers: {
    pushToHistory: (state, action) => {
      // Add new path to history, but limit length to 3
      state.history.push(action.payload);
      if (state.history.length > 3) {
        state.history = state.history.slice(-3);
      }
    },
  },
});

export const { pushToHistory } = navigationSlice.actions;
export default navigationSlice.reducer;