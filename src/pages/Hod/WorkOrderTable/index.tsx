import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { fetchPendingApprovalTasks, approveHodTask } from '../../../api/task';
import { STATUS } from '../../../constants/status';
import { useLoading } from '../../../contexts/LoadingContext';

const WorkOrderTableWithModal: React.FC = () => {
    const [rows, setRows] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const { showLoading, hideLoading } = useLoading();
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetchPendingApprovalTasks();
            const tasks = data.task.map((task: any) => ({
                id: task.id,
                title: task.title,
                code: task.code,
                estimatedLaborTime: task.estimatedLaborTime,
                dueDate: task.dueDate,
                createdBy: task.createdBy,
            }));
            setRows(tasks);
        } catch (err) {
            setError('Failed to load data.');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            showLoading();
            const payload = { approveStatus: STATUS.APPROVED, remarks: '' };
            await approveHodTask(id, payload);
            fetchData();
            setOpenModal(false);
            hideLoading();
        } catch (error) {
            hideLoading();
            console.error('Error approving task:', error);
        }
    };

    const handleDecline = async (id: string) => {
        try {
            // Add your decline logic here
            showLoading();
            fetchData();
            setOpenModal(false);
            hideLoading();
        } catch (error) {
            hideLoading();
            console.error('Error declining task:', error);
        }
    };

    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Code', width: 150 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'dueDate', headerName: 'Due Date', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                        setSelectedRow(params.row);
                        setOpenModal(true);
                    }}
                >
                    Open Details
                </Button>
            ),
        },
    ];

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <div className='work-order-table' style={{ width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
            />
            {selectedRow && (
                <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>{selectedRow.title}</DialogTitle>
                    <DialogContent>
                        <Typography>
                            <strong>Code:</strong> {selectedRow.code}
                        </Typography>
                        <Typography>
                            <strong>Created By:</strong> {selectedRow.createdBy}
                        </Typography>
                        <Typography>
                            <strong>Labor Time:</strong> {selectedRow.estimatedLaborTime}
                        </Typography>
                        <Typography>
                            <strong>Due Date:</strong> {selectedRow.dueDate}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => handleApprove(selectedRow.id)}
                            >
                                Approve
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDecline(selectedRow.id)}
                            >
                                Decline
                            </Button>
                        </Stack>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default WorkOrderTableWithModal;