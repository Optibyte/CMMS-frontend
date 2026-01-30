// src/api/auth.ts
import { API_ENDPOINTS } from '../constants/endpoints';
import api from './api';  // Import the Axios instance

// LOGIN API Call
export const login = async (username: string, password: string) => {
    try {
        const response = await api.post(API_ENDPOINTS.LOGIN, { username, password });
        // Store the access token in localStorage after successful login
        localStorage.setItem('authToken', response.data.accessToken);
        return response.data;  // Return the full response (contains access token and other data)
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;  // Propagate error to the caller
    }
};

// REGISTER API Call
export const register = async (userData: { email: string; password: string }) => {
    try {
        const response = await api.post(API_ENDPOINTS.REGISTER, userData);
        return response.data;  // Return the response data (e.g., success message)
    } catch (error) {
        console.error('Error registering:', error);
        throw error;  // Propagate error to the caller
    }
};

// RESET PASSWORD API Call
export const resetPassword = async (userId: string, resetData: { newPassword: string }) => {
    try {
        const response = await api.post(API_ENDPOINTS.RESET_PASSWORD.replace(':userId', userId), resetData);
        return response.data;  // Return the response data (e.g., success message)
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;  // Propagate error to the caller
    }
};

// Example: Fetch User Profile (after login)
export const getUserProfile = async (userId: string) => {
    try {
        const response = await api.get(API_ENDPOINTS.USER_PROFILE.replace(':userId', userId));
        return response.data;  // Return the user profile data
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};