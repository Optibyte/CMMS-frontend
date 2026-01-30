import React, { useEffect, useState } from 'react';
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonHeader,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonIcon,
    IonImg,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonSkeletonText,
} from '@ionic/react';
import SearchBar from '../../../components/SearchBar';
import JobCard from '../../../components/JobCard';
import EngJobDetailsModal from '../JobDetailsModal';
import './style.scss';
import { parseTask } from '../../../services/task.service';
import { fetchCreatedTasks } from '../../../api/task';
import { clearUser, setUser } from '../../../store/userSlice';
import { RootState } from '../../../store/store';
import { connect } from 'react-redux';
import { list, time, checkmarkDone, podium } from 'ionicons/icons';
import AddButton from '../../../components/AddButton';
import AddWorkOrderModal from '../AddWorkOrderModal';
import { STATUS } from '../../../constants/status';
import NoItemImg from '../../../assets/no_item_1.avif';
import { setNotificationState } from '../../../store/notificationSlice';

const EngineerDashboard: React.FC = (props: any) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [todoJobs, setToDoJobs] = useState<any[]>([]);
    const [myJobs, setMyJobs] = useState<any[]>([]);
    const [submittedJobs, setSubmittedJobs] = useState<any[]>([]);
    const [completedJobs, setCompletedJobs] = useState<any[]>([]);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [selectedSegment, setSelectedSegment] = useState<any>('todo');
    const [showWorkOrderModel, setShowWorkOrderModel] = useState(false);
    const [allJobs, setAllJobs] = useState<any[]>([]);

    useEffect(() => {
        if (props.user) {
            setLoading(true);
            fetchTasks();
        } else {
            setError('User ID not found');
            setLoading(false);
        }
    }, [props.user]);

    useEffect(() => {
        if (props.notification.selectedNotification) {
            const job = allJobs
                .find((task: any) => task.id === props.notification.selectedNotification.id);
            setSelectedJob(job);
            setIsModalOpen(true);
        }
    }, [props.notification]);

    const fetchTasks = () => {
        fetchCreatedTasks()
            .then((response) => {
                const { task = [] } = response;
                setAllJobs(task.map(parseTask));
                const todo = task
                    .filter((task: any) => !task.status || task.status.value == STATUS.TO_DO)
                    .map(parseTask);

                const inProgress = task
                    .filter((task: any) => task.status && task.status.value == STATUS.IN_PROGRESS)
                    .map(parseTask);

                const submitted = task
                    .filter((task: any) => task.status && task.status.value == STATUS.SUBMITTED)
                    .map(parseTask);

                const completed = task
                    .filter((task: any) => task.status && task.status.value == STATUS.COMPLETED)
                    .map(parseTask);

                setToDoJobs(todo);
                setMyJobs(inProgress);
                setSubmittedJobs(submitted);
                setCompletedJobs(completed);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch tasks');
                setLoading(false);
            });
    };

    const handleViewClick = (jobDetails: any) => {
        setSelectedJob(jobDetails);
        setIsModalOpen(true);
    };

    const filteredJobs = (jobs: any[]) => {
        return jobs.filter((job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const renderJobSection = (jobs: any[], emptyMessage: string) => (
        <IonRow>
            {loading ? (
                Array(3).fill(null).map((_, index) => (
                    <IonCol key={index} size="12" sizeMd="6" sizeLg="4">
                        <IonCard className="job-card no-shadow">
                            <IonCardHeader>
                                <IonGrid className="job-grid">
                                    <IonRow className="job-title-skeleton">
                                        <IonCol size="3">
                                            <IonSkeletonText animated className="skeleton-box large" />
                                        </IonCol>
                                        <IonCol size="8">
                                            <IonSkeletonText animated className="skeleton-box medium" />
                                            <IonSkeletonText animated className="skeleton-box small" />
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonSkeletonText animated className="skeleton-box content" />
                                <IonSkeletonText animated className="skeleton-box secondary" />
                                <IonSkeletonText animated className="skeleton-box tertiary" />
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                ))
            ) : filteredJobs(jobs).length === 0 ? (
                <IonCol size="12">
                    <IonImg src={NoItemImg}></IonImg>
                    <p className="no-jobs-message">{emptyMessage}</p>
                </IonCol>
            ) : (
                filteredJobs(jobs).map((job, index) => (
                    <IonCol key={index} size="12" sizeMd="6" sizeLg="4">
                        <JobCard
                            {...job}
                            onViewClick={() => handleViewClick(job)}
                        />
                    </IonCol>
                ))
            )}
        </IonRow>
    );

    const getJobsBySegment = () => {
        switch (selectedSegment) {
            case 'todo':
                return renderJobSection(todoJobs, 'No To-Do jobs available.');
            case 'inProgress':
                return renderJobSection(myJobs, 'No jobs in progress.');
            case 'submitted':
                return renderJobSection(submittedJobs, 'No submitted jobs available.');
            case 'completed':
                return renderJobSection(completedJobs, 'No completed jobs available.');
            default:
                return null;
        }
    };

    const onCloseJobDetails = () => {
        setIsModalOpen(false);
        setShowWorkOrderModel(false);
        setSelectedJob(null);
        fetchTasks();
        setNotificationState(null);
    };

    if (error) {
        return <IonText color="danger">{error}</IonText>;
    }

    const handleAddButtonClick = () => {
        setShowWorkOrderModel(true);
    }

    return (
        <IonPage>
            <IonHeader className="page-header-container">
                <IonToolbar>
                    <IonGrid className='no-padding'>
                        <SearchBar onSearch={setSearchTerm} />
                        <IonRow>
                            <IonSegment
                                value={selectedSegment}
                                scrollable
                                onIonChange={(e) => setSelectedSegment(e.detail.value)}
                            >
                                <IonSegmentButton value="todo">
                                    <IonRow className='job-segment-contain'>
                                        <IonCol size='3'>
                                            <IonIcon icon={list} />
                                        </IonCol>
                                        <IonCol size='9'>
                                            <IonLabel className="job-segment-label">To-Do</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                </IonSegmentButton>
                                <IonSegmentButton value="inProgress">
                                    <IonRow className='job-segment-contain'>
                                        <IonCol size='3'>
                                            <IonIcon icon={time} />
                                        </IonCol>
                                        <IonCol size='9'>
                                            <IonLabel className="job-segment-label">Pending</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                </IonSegmentButton>
                                <IonSegmentButton value="submitted">
                                    <IonRow className="job-segment-label">
                                        <IonCol size='3'>
                                            <IonIcon icon={podium} />
                                        </IonCol>
                                        <IonCol size='9'>
                                            <IonLabel className="job-segment-label">Submitted</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                </IonSegmentButton>
                                <IonSegmentButton value="completed">
                                    <IonRow className="job-segment-label">
                                        <IonCol size='3'>
                                            <IonIcon icon={checkmarkDone} />
                                        </IonCol>
                                        <IonCol size='9'>
                                            <IonLabel className="job-segment-label">Completed</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                </IonSegmentButton>
                            </IonSegment>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" fullscreen>
                <IonGrid className="job-segment-grid">{getJobsBySegment()}</IonGrid>
                {selectedJob && (
                    <EngJobDetailsModal
                        isOpen={isModalOpen}
                        closeModal={onCloseJobDetails}
                        jobDetails={selectedJob}
                    />
                )}
                <AddButton onclickFabButton={handleAddButtonClick}></AddButton>
                {showWorkOrderModel && <AddWorkOrderModal isOpen={showWorkOrderModel} closeModal={onCloseJobDetails}></AddWorkOrderModal>}
            </IonContent>
        </IonPage>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.user,
    notification: state.notification
});

const mapDispatchToProps = {
    setUser,
    clearUser,
    setNotificationState
};

export default connect(mapStateToProps, mapDispatchToProps)(EngineerDashboard);