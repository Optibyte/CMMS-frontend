import React, { useState, useEffect } from "react";
import {
  IonList,
  IonCard,
  IonCardContent,
  IonLabel,
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAvatar,
  IonBadge,
  IonRow,
  IonCol,
  IonGrid,
  IonSkeletonText,
} from "@ionic/react";

import { getTaskById } from "../../api/task";
import { fetchNotifications, notificationRead } from "../../api/notification";
import { parseTask } from "../../services/task.service";
import "./style.scss";
import { Typography } from "@mui/material";
import { setNotificationState } from "../../store/notificationSlice";
import { useDispatch } from "react-redux";
import FullNotification from "../FullNotification";
import { formatTime } from '../../utils'

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  userId: string;
  taskId: string;
  createdAt: string;
  actionBy: any;
}

const NotificationList: React.FC<{ user: any }> = ({ user }) => {
  const [filteredNotifications, setFilteredNotifications] = useState<
    Notification[]
  >([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const dispatch = useDispatch();
  const [isViewMoreClicked, setIsViewMoreClicked] = useState(false);

  const offset = 0;

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const fetchedNotifications = await fetchNotifications(
          user.id,
          offset,
          10,
          false
        );
        if (Array.isArray(fetchedNotifications.notifications)) {
          setFilteredNotifications(fetchedNotifications.notifications);
          setHasLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    loadNotifications();
  }, [user.id, offset]);

  const handleNotificationClick = async (
    taskId: string,
    notificationId: string
  ) => {
    try {
      const jobDetails2 = await getTaskById(taskId);
      const jobDetails = parseTask(jobDetails2, 0);

      setFilteredNotifications((prevNotifications) =>

        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );

      notificationRead(notificationId);
      dispatch(setNotificationState(jobDetails));
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

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

  const handleClickViewMore = () => {
    setIsViewMoreClicked(true);
  }

  const handleCloseViewMore = () => {
    setIsViewMoreClicked(false);
  }


  return (
    <>
      {!hasLoaded ? (
        <IonList className="skeleton-container">
          {[...Array(2)].map((_, index) => (
            <IonCard key={index} className="skeleton-card">
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size="2">
                      <IonSkeletonText animated className="avatar-skeleton" />
                    </IonCol>
                    <IonCol size="8">
                      <IonSkeletonText animated className="title-skeleton" />
                      <IonSkeletonText animated className="time-skeleton" />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonSkeletonText animated className="message-skeleton" />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      ) : filteredNotifications.length === 0 ? (
        <IonText color="medium" className="no-notifications-message text-center">
          <p>No notifications available</p>
        </IonText>
      ) : (
        <IonList className="notification-container">
          {filteredNotifications.map((notification) => (
            <IonCard
              key={notification.id}
              button
              onClick={() =>
                handleNotificationClick(notification.taskId, notification.id)
              }
              className={`notification-card ${notification.isRead ? "read" : "unread"
                }`}
            >
              <IonCardContent>
                <IonGrid>
                  <IonRow className="notification-row">
                    <IonCol size="2">
                      <IonAvatar>
                        {getProfilePicture(
                          notification.actionBy?.profilePicture,
                          notification.actionBy?.username
                        )}
                      </IonAvatar>
                    </IonCol>
                    <IonCol size="8" className="notification-title">
                      <IonLabel className="label-title">
                        {notification.title}
                      </IonLabel>
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
                      <p className="notification-message">
                        {notification.message}
                      </p>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          ))}
          <Typography
            onClick={handleClickViewMore}
            variant="body2"
            color="primary"
            sx={{ cursor: 'pointer', fontWeight: 'bold' }}
            className="view-more"
          >
            View more
          </Typography>
          <FullNotification isOpen={isViewMoreClicked} closeModal={handleCloseViewMore} user={user}></FullNotification>
        </IonList>
      )}
    </>
  );
};

export default NotificationList;
