import React, { useEffect, useState } from 'react';
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
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
import TechJobDetailsModal from '../JobDetailsModal';
import { fetchAssignedTasks } from '../../../api/task';
import './style.scss';
import { parseTask } from '../../../services/task.service';
import { connect } from 'react-redux';
import { clearUser, setUser } from '../../../store/userSlice';
import { RootState } from '../../../store/store';
import { compass, podium, trophy } from 'ionicons/icons';
import { STATUS } from '../../../constants/status';
import NoItemImg from '../../../assets/no_item_1.avif';
import { setNotificationState } from '../../../store/notificationSlice';

const TechnicianDashboard: React.FC = (props: any) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [allJobs, setAllJobs] = useState<any[]>([]);
    const [myJobs, setMyJobs] = useState<any[]>([]);
    const [completedJobs, setCompletedJobs] = useState<any[]>([]);
    const [submittedJobs, setSubmittedJobs] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [userId, setUserId] = useState('');
    const [selectedSegment, setSelectedSegment] = useState<any>('myJobs');

    useEffect(() => {
        if (props.user) {
            setLoading(true)
            setUserId(props.user.id);
            fetchTasks(props.user.id);
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

    const fetchTasks = (user: string) => {
        fetchAssignedTasks(user)
            .then((tasks) => {
                setAllJobs(tasks.map(parseTask));
                const inProgress = tasks
                    .filter((task: any) => task.status.value == STATUS.IN_PROGRESS)
                    .map(parseTask);

                const completed = tasks
                    .filter((task: any) => task.status.value === STATUS.COMPLETED)
                    .map(parseTask);

                const submitted = tasks
                    .filter((task: any) => task.status.value === STATUS.SUBMITTED)
                    .map(parseTask);

                setSubmittedJobs(submitted);
                setMyJobs(inProgress);
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

    const onCloseJobDetails = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
        fetchTasks(userId);
        setNotificationState(null);
    };

    const renderJobSection = (jobs: any[], emptyMessage: string) => (
        <>
            <IonRow>
                {loading ? (
                    Array(3)
                        .fill(null)
                        .map((_, index) => (
                            <IonCol key={index} size="12" sizeMd="6" sizeLg="4">
                                <IonCard className="job-card no-shadow">
                                    <IonCardHeader>
                                        <IonGrid className="job-grid">
                                            <IonRow className="job-title-skeleton">
                                                <IonCol size="3">
                                                    <IonSkeletonText
                                                        animated
                                                        className="skeleton-box large"
                                                    />
                                                </IonCol>
                                                <IonCol size="8">
                                                    <IonSkeletonText
                                                        animated
                                                        className="skeleton-box medium"
                                                    />
                                                    <IonSkeletonText
                                                        animated
                                                        className="skeleton-box small"
                                                    />
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonSkeletonText
                                            animated
                                            className="skeleton-box content"
                                        />
                                        <IonSkeletonText
                                            animated
                                            className="skeleton-box secondary"
                                        />
                                        <IonSkeletonText
                                            animated
                                            className="skeleton-box tertiary"
                                        />
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
                            <JobCard {...job} onViewClick={() => handleViewClick(job)} />
                        </IonCol>
                    ))
                )}
            </IonRow>
        </>
    );


    const getJobsBySegment = () => {
        switch (selectedSegment) {
            case 'myJobs':
                return renderJobSection(
                    myJobs,
                    'No jobs assigned at the moment.'
                );
            case 'submittedJobs':
                return renderJobSection(
                    submittedJobs,
                    'No jobs submitted at the moment.'
                );
            case 'completedJobs':
                return renderJobSection(
                    completedJobs,
                    'No completed jobs yet.'
                );
            default:
                return null;
        }
    };

    return (
        <IonPage>
            <IonHeader className="page-header-container">
                <IonToolbar>
                    <IonGrid className='no-padding'>
                        <SearchBar onSearch={setSearchTerm} />
                        <IonRow className='no-padding'>
                            <IonSegment
                                value={selectedSegment}
                                onIonChange={(e) => setSelectedSegment(e.detail.value)}
                            >
                                <IonSegmentButton value="myJobs">
                                    <IonRow>
                                        <IonCol size='3'>
                                            <IonIcon icon={compass}></IonIcon>
                                        </IonCol>
                                        <IonCol size='9'>
                                            <IonLabel className="job-segment-label">My Jobs</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                </IonSegmentButton>
                                <IonSegmentButton value="submittedJobs">
                                    <IonRow>
                                        <IonCol size='3'>
                                            <IonIcon icon={podium}></IonIcon>
                                        </IonCol>
                                        <IonCol size='9'>
                                            <IonLabel className="job-segment-label">Submitted</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                </IonSegmentButton>
                                <IonSegmentButton value="completedJobs">
                                    <IonRow>
                                        <IonCol size='3'>
                                            <IonIcon icon={trophy}></IonIcon>
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
                <IonGrid className="my-jobs-grid no-padding">
                    {getJobsBySegment()}
                </IonGrid>

                {selectedJob && (
                    <TechJobDetailsModal
                        isOpen={isModalOpen}
                        closeModal={onCloseJobDetails}
                        completeJob={onCloseJobDetails}
                        jobDetails={selectedJob}
                    />
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(TechnicianDashboard);