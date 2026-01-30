import { createSlice } from '@reduxjs/toolkit';

interface NotificationState {
    selectedNotification: any;
}

const initialState: NotificationState = {
    selectedNotification: null
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationState(state, action) {
            state.selectedNotification = action.payload;
        }
    },
});

export const { setNotificationState } = notificationSlice.actions;
export default notificationSlice.reducer;
