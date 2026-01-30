import api from './api';
import { API_ENDPOINTS } from '../constants/endpoints';

/**
 * Update a single checklist
 * @param checklistId - The ID of the checklist
 * @param payload - The payload for the update
 */
export const updateChecklist = async (checklistId: string, payload: any, taskId: string) => {
    try {
        const response = await api.put(API_ENDPOINTS.UPDATE_CHECKLIST(checklistId, taskId), payload);
        return response.data;
    } catch (error) {
        console.error('Error updating checklist:', error);
        throw error;
    }
};

/**
 * Update multiple checklists
 * @param checklists - Array of objects containing checklistId and payload
 */
export const updateMultipleChecklists = async (checklists: { checklistId: string; payload: any }[], taskId: string) => {
    try {
        const responses = await Promise.all(
            checklists.map((item) =>
                api.put(API_ENDPOINTS.UPDATE_CHECKLIST(item.checklistId, taskId), item.payload)
            )
        );
        return responses.map((response) => response.data);
    } catch (error) {
        console.error('Error updating multiple checklists:', error);
        throw error;
    }
};