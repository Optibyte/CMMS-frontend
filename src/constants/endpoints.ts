export const API_ENDPOINTS = {
    LOGIN: '/api/v1/cmms/auth/login',
    REGISTER: '/api/v1/cmms/auth/register',
    RESET_PASSWORD: '/api/v1/cmms/user/:userId/reset-password',
    USER_PROFILE: '/api/v1/cmms/user/:userId/profile',
    ASSIGNED_TASKS: '/api/v1/cmms/task/assigned-to/:userId',
    UPDATE_TASK: '/api/v1/cmms/task/:taskId',
    GET_TASKS: '/api/v1/cmms/task',
    ASSIGN_TASK: (taskId: string, technicianId: string) =>
        `/api/v1/cmms/task/${taskId}/assigned-to/${technicianId}`,
    APPROVE_TASK: (taskId: string) => `/api/v1/cmms/task/${taskId}/approve`,
    GET_TECHNICIANS: `/api/v1/cmms/user/supervisor/:eng_id`,
    UPDATE_CHECKLIST: (checklistId: string, taskId: string) => `/api/v1/cmms/checklist/${checklistId}/task/${taskId}`,
    PENDING_APPROVALS: '/api/v1/cmms/task/pending/approval',
    TASK_STATUS_SUMMARY: '/api/v1/cmms/task/status/summary',
    TASK_CREATE: '/api/v1/cmms/task',
    ASSET_FETCH: '/api/v1/cmms/asset',
    FETCH_NOTIFICATION:`/api/v1/cmms/notifications/user/:userId`,
    NOTIFICATION_READ: `/api/v1/cmms/notifications/:notificationId/read`,
    APPROVE_HOD_TASK: '/api/v1/cmms/task/:taskid/approve'
};
