/**
 * Redux store configuration
 * @module store
 */

import { configureStore } from '@reduxjs/toolkit';

// Import slices
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    // Add more slices as they are created
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: import.meta.env.DEV,
});

export default store;

