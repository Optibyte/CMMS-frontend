import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { fetchTaskStatusSummary } from '../../../api/task';
import { IonLabel } from '@ionic/react';

ChartJS.register(ArcElement, Tooltip, Legend);

const PMOverview: React.FC = () => {
    const [chartData, setChartData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const year = new Date().getFullYear();
                const month = new Date().getMonth() + 1;
                const data = await fetchTaskStatusSummary(year, month);

                const { taskSummary } = data;
                const labels = ['To Do', 'In Progress', 'Completed', 'Overdue'];
                const dataset = Array(4).fill(0);

                taskSummary.forEach((item: any) => {
                    dataset[item.status] = item.count;
                });

                setChartData({
                    labels,
                    datasets: [
                        {
                            data: dataset,
                            backgroundColor: ['#2196f3', '#ffc107', '#4caf50', '#f44336'],
                            hoverBackgroundColor: ['#1976d2', '#ffb300', '#388e3c', '#d32f2f'],
                        },
                    ],
                });
            } catch (err) {
                setError('Failed to load chart data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: true,
            },
            datalabels: {
                color: '#fff',
                font: {
                    weight: 'bold',
                },
                formatter: (value: number, context: any) => {
                    const total = context.dataset.data.reduce((sum: number, val: number) => sum + val, 0);
                    const percentage = ((value / total) * 100).toFixed(1) + '%';
                    return percentage;
                },
            },
        },
        cutout: '70%',
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                padding: 2,
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                margin: 'auto',
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <IonLabel className='label-title'>PM Overview</IonLabel>
                <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                >
                    View
                </Typography>
            </Box>
            <Box sx={{ height: '200px', position: 'relative' }}>
                <Doughnut data={chartData} options={options} />
            </Box>
        </Box>
    );
};

export default PMOverview;