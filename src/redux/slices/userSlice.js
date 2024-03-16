import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

export const signupUser = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.signup(userData);
      return response.data; // Ensure this matches your backend response structure
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.login(userData);
      dispatch(userSlice.actions.setToken(response.token)); // Set token in Redux state
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    role: 'public',
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = 'public';
      state.isLoading = false; // Consider resetting isLoading on logout
      state.error = null; // Resetting error state on logout can be a good idea
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Optionally clear error on new signup attempt
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Ensure action.payload contains user data structured as expected
        state.user = action.payload.user; 
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Adjust if payload structure differs
        state.role = action.payload.role; // Assuming role is returned with user data
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Unable to login";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
