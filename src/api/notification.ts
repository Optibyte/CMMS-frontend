import api from './api';
import { API_ENDPOINTS } from '../constants/endpoints';

export const fetchNotifications = async (userId: string, offset: number = 0, limit: number = 10,isRead?: boolean) => {
    try {
        const params = new URLSearchParams({
            offset: offset.toString(),
            limit: limit.toString(),
        });
        console.log('userId',userId);
        
        if (isRead !== undefined && isRead !== null) {
            params.append('isRead', isRead.toString());
        }
        const response = await api.get(`${API_ENDPOINTS.FETCH_NOTIFICATION.replace(':userId', userId)}?${params.toString()}`);

        return response.data || [];
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};


export const notificationRead = (notificationId: any) => {
    try {
        api.put(API_ENDPOINTS.NOTIFICATION_READ.replace(':notificationId', notificationId));
    } catch (error) {
        console.error('Error updating task:', error);
    }
};