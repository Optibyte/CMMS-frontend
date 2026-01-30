import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import notificationReducer from './notificationSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        notification: notificationReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
