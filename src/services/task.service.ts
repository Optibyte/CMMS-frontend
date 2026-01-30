import { STATUS } from "../constants/status";
import { Task } from "../types/JobCardProps";

export const parseTask = (task: any, index: number): Task => {
    return {
        id: task.id,
        workOrderId: task.code,
        title: task.title,
        description: task.description || 'No description available',
        status: task.status,
        jobStatus: task.status?.label,
        statusColor: (task.status?.value === STATUS.IN_PROGRESS || (!task.status || task.status.value == STATUS.TO_DO)) ? 'primary' : 'success',
        startDate: task.startDate || 'N/A',
        dueDate: task.dueDate || 'N/A',
        priority: task.priority || 'N/A',
        assignedDate: task.assignedDate || null,
        approveStatus: task.approveStatus || 'N/A',
        assignedToRemarks: task.assignedToRemarks || 'No remarks provided',
        createdByRemarks: task.createdByRemarks || 'No remarks provided',
        estimatedLaborTime: task.estimatedLaborTime || 'N/A',
        workOrderType: task.workOrderType || 'N/A',
        linkedWorkOrder: task.linkedWorkOrder || 'N/A',
        assetName: `${task.asset?.localLabel || 'N/A'} | ${task.asset?.title || 'N/A'}`,
        jobImage: task.asset?.photos?.[0] || 'https://fastly.picsum.photos/id/84/1280/848.jpg?hmac=YFRYDI4UsfbeTzI8ZakNOR98wVU7a-9a2tGF542539s',
        checklists: task?.checklists?.map((checklist: any) => ({
            id: checklist.id,
            question: checklist.question,
            questionType: checklist.questionType,
            description: checklist.description,
            status: checklist.status,
            option: checklist.option,
            remarks: checklist.remarks || 'No remarks',
            expectedAnswer: checklist.expectedAnswer || 'N/A',
        })) || [],
        assignedTo: task.assignedTo
            ? {
                id: task.assignedTo.id,
                username: task.assignedTo.username,
                email: task.assignedTo.email,
                firstName: task.assignedTo.firstName || null,
                lastName: task.assignedTo.lastName || null,
                mobileNumber: task.assignedTo.mobileNumber || null,
                createdAt: task.assignedTo.createdAt,
                updatedAt: task.assignedTo.updatedAt,
            }
            : null,
        asset: {
            id: task.asset?.id || 'N/A',
            title: task.asset?.title || 'N/A',
            category: task.asset?.category || 'N/A',
            metadata: {
                year: task.asset?.metadata?.year || 0,
                brand: task.asset?.metadata?.brand || 'Unknown',
                model: task.asset?.metadata?.model || 'Unknown',
            },
            photos: task.asset?.photos || [],
            specifications: task.asset?.specifications || 'N/A',
            location: {
                latitude: task.asset?.location?.latitude || 0,
                longitude: task.asset?.location?.longitude || 0,
            },
            localLabel: task.asset?.localLabel || 'N/A',
            createdAt: task.asset?.createdAt || 'N/A',
            updatedAt: task.asset?.updatedAt || 'N/A',
            isDeleted: task.asset?.isDeleted || false,
        },
    };
};
