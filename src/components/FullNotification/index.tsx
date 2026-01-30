import React, { useEffect, useState } from "react";
import "./style.scss";
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonModal,
    IonList,
    IonLabel,
    IonButton,
    IonText,
    IonButtons,
    IonIcon,
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
    IonBadge,
    IonSegmentButton,
    IonSegment,
} from "@ionic/react";
import { fetchNotifications } from "../../api/notification";
import { notificationLimit } from "../../constants/values";
import { closeOutline, list, time } from "ionicons/icons";
import { formatTime } from "../../utils";

interface FullNotification {
    id: string;
    title: string;
    message: string;
    isRead: boolean;
    userId: string;
    taskId: string;
    createdAt: string;
    actionBy: any;
}

const FullNotification = ({ user, isOpen, closeModal }: any) => {
    const [notifications, setNotifications] = useState<FullNotification[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSegment, setSelectedSegment] = useState("all");

    const loadNotifications = async (offset: number, isRead: any) => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const fetchedNotifications = await fetchNotifications(
                user.id,
                offset,
                notificationLimit,
                isRead
            );

            if (Array.isArray(fetchedNotifications.notifications)) {
                setNotifications((prev) =>
                    offset === 0 ? fetchedNotifications.notifications : [...prev, ...fetchedNotifications.notifications]
                );
                setHasMore(fetchedNotifications.notifications.length === notificationLimit);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadMore = () => {
        const nextOffset = offset + notificationLimit;
        setOffset(nextOffset);
        if (selectedSegment==='read'){
            loadNotifications(nextOffset, true);
        }
        else if (selectedSegment==='unread'){
            loadNotifications(nextOffset, false)
        }
        else{
            loadNotifications(nextOffset, null) 
        }
    };

    const resetValues = () => {
        setNotifications([]);
        setOffset(0);
        setHasMore(true);
    };

    useEffect(() => {
        if (isOpen) {
            resetValues();
            if (selectedSegment==='read'){
                loadNotifications(0, true);
            }
            else if (selectedSegment==='unread'){
                loadNotifications(0, false)
            }
            else{
                loadNotifications(0, null) 
            }
            console.log('selectedSegmentafter', selectedSegment);
        }
    }, [isOpen, selectedSegment]);

    const getProfilePicture = (profilePicture: any, username: string) => {
        const stringToColor = (str: string) => {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = (hash << 5) - hash + str.charCodeAt(i);
                hash = hash & hash;
            }
            const color = (hash & 0x00ffffff).toString(16).toUpperCase();
            return `#${"00000".substring(0, 6 - color.length) + color}`;
        };

        if (profilePicture) {
            return <img src={profilePicture} alt="Profile" className="profile-pic" />;
        } else {
            const firstLetter = username ? username.charAt(0).toUpperCase() : "";
            const bgColor = stringToColor(username);
            return (
                <div className="profile-pic" style={{ backgroundColor: bgColor }}>
                    {firstLetter}
                </div>
            );
        }
    };

    return (
        <IonModal isOpen={isOpen}>
            <IonHeader className="notification-header-container">
                <IonToolbar>
                    <IonTitle>Notifications</IonTitle>
                    <IonButtons slot="end">
                        <IonIcon className="close-icon" onClick={closeModal} icon={closeOutline} />
                    </IonButtons>
                    <IonGrid className="no-padding">
                        <IonRow>
                            <IonSegment
                                value={selectedSegment}
                                scrollable
                                onIonChange={(e) => {
                                    setSelectedSegment(e.detail.value);
                                }}
                            >
                                <IonSegmentButton value="all">
                                    <IonRow className="job-segment-contain">
                                        <IonCol size="3">
                                            <IonIcon icon={time} />
                                        </IonCol>
                                        <IonCol size="9">
                                            <IonLabel className="job-segment-label">All</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                </IonSegmentButton>
                                <IonSegmentButton value="unread">
                                    <IonRow className="job-segment-contain">
                                        <IonCol size="3">
                                            <IonIcon icon={list} />
                                        </IonCol>
                                        <IonCol size="9">
                                            <IonLabel className="job-segment-label">Unread</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                </IonSegmentButton>
                                <IonSegmentButton value="read">
                                    <IonRow className="job-segment-contain">
                                        <IonCol size="3">
                                            <IonIcon icon={time} />
                                        </IonCol>
                                        <IonCol size="9">
                                            <IonLabel className="job-segment-label">Read</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                </IonSegmentButton>
                            </IonSegment>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList className="notification-container">
                    {notifications.map((notification) => (
                        <IonCard
                            key={notification.id}
                            button
                            className={`notification-card ${notification.isRead ? "read" : "unread"}`}
                        >
                            <IonCardContent>
                                <IonGrid>
                                    <IonRow className="notification-row">
                                        <IonCol size="2">
                                            <IonAvatar>
                                                {getProfilePicture(notification.actionBy?.profilePicture, notification.actionBy?.username)}
                                            </IonAvatar>
                                        </IonCol>
                                        <IonCol size="8" className="notification-title">
                                            <IonLabel className="label-title">{notification.title}</IonLabel>
                                            <IonText color="medium" className="notification-time">
                                                {formatTime(notification.createdAt)}
                                            </IonText>
                                        </IonCol>
                                        <IonCol size="2">
                                            {!notification.isRead && (
                                                <IonBadge color="success" className="new-badge">
                                                    New
                                                </IonBadge>
                                            )}
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="notification-row">
                                        <IonCol size="12">
                                            <p className="notification-message">{notification.message}</p>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCardContent>
                        </IonCard>
                    ))}
                    <IonInfiniteScroll
                        onIonInfinite={(e: any) => {
                            loadMore();
                            e.target.complete();
                        }}
                        disabled={!hasMore}
                    >
                        <IonInfiniteScrollContent loadingText="Loading more notifications..." />
                    </IonInfiniteScroll>
                </IonList>
            </IonContent>
        </IonModal>
    );
};

export default FullNotification;
