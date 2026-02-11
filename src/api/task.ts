import api from './api';  // Axios instance
import { API_ENDPOINTS } from '../constants/endpoints';
import { getUser } from '../services/localStorage.service';

export const fetchAssignedTasks = async (userId: string) => {
    try {
        const response = await api.get(API_ENDPOINTS.ASSIGNED_TASKS.replace(':userId', userId));
        return response.data.normalizeTask || [];
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const updateChecklist = async (taskId: string, checklist: any[]) => {
    try {
        const response = await api.put(`/api/v1/cmms/task/${taskId}/checklist`, {
            checklist,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating checklist:', error);
        throw error;
    }
};

export const updateTask = async (taskId: string, payload: any) => {
    try {
        const response = await api.put(API_ENDPOINTS.UPDATE_TASK.replace(':taskId', taskId), payload);
        console.log('Task updated successfully:', response.data);
    } catch (error) {
        console.error('Error updating task:', error);
    }
};

export const fetchCreatedTasks = async () => {
    const response = await api.get(API_ENDPOINTS.GET_TASKS);
    return response.data;
};

export const fetchTechnicians = async () => {
    const user: any = getUser();
    const response = await api.get(API_ENDPOINTS.GET_TECHNICIANS.replace(':eng_id', user.id));
    return response.data || [];
};

export const assignTask = async (taskId: string, technicianId: string) => {
    return await api.put(API_ENDPOINTS.ASSIGN_TASK(taskId, technicianId));
};

export const approveTask = async (taskId: string, payload: any) => {
    return await api.put(API_ENDPOINTS.APPROVE_TASK(taskId), payload);
};

export const approveHodTask = async (taskId: string, payload: any) => {
    return await api.put(API_ENDPOINTS.APPROVE_HOD_TASK.replace(':taskid', taskId), payload);
};

/**
 * 
 * Fetch tasks pending approval
 * @returns {Promise<any>} Response with pending approval tasks
 */
export const fetchPendingApprovalTasks = async (): Promise<any> => {
    try {
        const response = await api.get(API_ENDPOINTS.PENDING_APPROVALS);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch pending approval tasks:', error);
        throw error;
    }
};

// Fetch task status summary
export const fetchTaskStatusSummary = async (year: number, month: number) => {
    try {
        const response = await api.get(`${API_ENDPOINTS.TASK_STATUS_SUMMARY}?year=${year}&month=${month}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch task status summary:', error);
        throw error;
    }
};

// Fetch assets
export const fetchAssets = async () => {
    try {
        const response = await api.get(API_ENDPOINTS.ASSET_FETCH);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch assets:', error);
        throw error;
    }
};

// Create asset
export const createAsset = async (payload: any) => {
    try {
        const response = await api.post(API_ENDPOINTS.ASSET_CREATE, payload);
        return response.data;
    } catch (error) {
        console.error('Failed to create asset:', error);
        throw error;
    }
};

// Update asset
export const updateAsset = async (assetId: string, payload: any) => {
    try {
        const response = await api.put(API_ENDPOINTS.ASSET_UPDATE.replace(':assetId', assetId), payload);
        return response.data;
    } catch (error) {
        console.error('Failed to update asset:', error);
        throw error;
    }
};

// Create task
export const createTask = async (payload: any) => {
    try {
        const response = await api.post(API_ENDPOINTS.TASK_CREATE, payload);
        return response.data;
    } catch (error) {
        console.error('Failed to create task:', error);
        throw error;
    }
};

// Get Task by Id
export const getTaskById = async (taskId: string) => {
    try {
        const response = await api.get(API_ENDPOINTS.UPDATE_TASK.replace(':taskId', taskId));
        console.log('Task updated successfully:', response.data);
        return response.data || [];
    } catch (error) {
        console.error('Error updating task:', error);
        throw error
    }
}

export const uploadTaskImage = async (file: File, checklistId?: string, taskId?: string) => {
    try {
        const formData = new FormData();
        formData.append('image', file);
        if (checklistId) {
            formData.append('checklistId', checklistId);
        }
        if (taskId) {
            formData.append('taskId', taskId);
        }
        const response = await api.post(API_ENDPOINTS.UPLOAD_TASK_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const deleteTaskImage = async (url: string, checklistId?: string) => {
    try {
        const response = await api.post(API_ENDPOINTS.DELETE_TASK_IMAGE, { url, checklistId });
        return response.data;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};

export const fetchChecklistPhotos = async (checklistId: string) => {
    try {
        const response = await api.get(API_ENDPOINTS.GET_CHECKLIST_PHOTOS(checklistId));
        return response.data.photos || [];
    } catch (error) {
        console.error('Error fetching checklist photos:', error);
        throw error;
    }
};