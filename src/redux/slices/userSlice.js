import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import authService from '../../services/user/authService';

const extractUserInfo = (token) => {
  const decoded = jwtDecode(token);
  return {
    id: decoded.id,
    username: decoded.username,
    email: decoded.email,
    role: decoded.role,
    profileId: decoded.profileId,
  };
};

export const signupUser = createAsyncThunk(
  'user/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.signup(userData);
      return { message: response.message }; // Assume response includes a success message
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.login(userData);
      const { refreshToken } = response;
      const user = extractUserInfo(refreshToken);
      localStorage.setItem('refreshToken', refreshToken);
      return { user, refreshToken };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem('refreshToken'); // Get refresh token from local storage
    try {
      await authService.logout(refreshToken);
      localStorage.removeItem('refreshToken');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    userId: null, // Added userId to initialState
    profileId: null, // Added profileId to initialState
    role: 'public',
    refreshToken: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload; // This won't store in localStorage, just state
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      localStorage.setItem('refreshToken', action.payload);
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('refreshToken');
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.userId = null; // Clear userId on logout
      state.profileId = null; // Clear profileId on logout
      state.role = 'public';
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
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
        state.user = action.payload.user;
        state.userId = action.payload.user.id; // Set userId from payload
        state.profileId = action.payload.user.profileId; // Set profileId from payload
        state.refreshToken = action.payload.refreshToken;
        state.role = action.payload.user.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Unable to login';
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.userId = null; // Clear userId on logout
        state.profileId = null; // Clear profileId on logout
        state.role = 'public';
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.userId = null; // Clear userId on logout
        state.profileId = null; // Clear profileId on logout
        state.role = 'public';
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.userId = null; // Clear userId on logout
        state.profileId = null; // Clear profileId on logout
        state.role = 'public';
        state.error = action.payload;
      });
  },
});

export const { logout, setToken, setRefreshToken, clearTokens } = userSlice.actions;
export default userSlice.reducer;
