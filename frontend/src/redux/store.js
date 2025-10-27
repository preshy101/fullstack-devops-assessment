import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['form/setCurrentForm'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.createdAt'],
        // Ignore these paths in the state
        ignoredPaths: ['form.sections'],
      },
    }),
});

export default store;