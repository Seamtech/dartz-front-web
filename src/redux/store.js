import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import userReducer from './slices/userSlice';
import navigationReducer from './slices/navigationSlice';
import userPreferencesReducer from './slices/userPreferencesSlice';

const rootReducer = combineReducers({
  user: userReducer,
  breadcrumb: navigationReducer,
  preferences: userPreferencesReducer,
  // You can add other reducers here
});

const persistConfig = {
  key: 'root', // The key for the data to be stored in the storage
  storage, // The storage to use (localStorage in this case)
  // Add any other config here, e.g., whitelist or blacklist specific reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/PERSIST', 'persist/PURGE', 'persist/REGISTER'],
      },
    }),
  devTools: import.meta.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export const persistor = persistStore(store);
