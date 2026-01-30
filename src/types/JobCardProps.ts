export interface JobCardProps {
    title: string;
    jobStatus: string;
    id: string;
    workOrderId?: string;
    assetName: string;
    dueDate: string;
    statusColor: string;
    jobImage: string;
    onViewClick: Function;
}

export interface Task {
    id: string;
    title: string;
    workOrderId: string;
    description: string;
    status: string;
    jobStatus: string;
    statusColor: string;
    startDate: string;
    dueDate: string;
    priority: string;
    assignedDate: string | null;
    approveStatus: string;
    assignedToRemarks: string;
    createdByRemarks?: string;
    assetName: string;
    estimatedLaborTime: string;
    workOrderType: string;
    linkedWorkOrder: string;
    jobImage: string;
    checklists: {
        id: string;
        question: string;
        questionType: string;
        description: string;
        status: string;
        option: object;
        remarks: string | null;
        expectedAnswer: string;
    }[];
    assignedTo: {
        id: string;
        username: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        mobileNumber: string | null;
        createdAt: string;
        updatedAt: string;
    } | null;
    asset: {
        id: string;
        title: string;
        category: string;
        metadata: {
            year: number;
            brand: string;
            model: string;
        };
        photos: string[];
        specifications: string;
        location: {
            latitude: number;
            longitude: number;
        };
        localLabel: string;
        createdAt: string;
        updatedAt: string;
        isDeleted: boolean;
    };
}