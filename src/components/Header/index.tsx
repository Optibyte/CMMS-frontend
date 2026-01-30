import React, { useEffect, useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonAvatar,
  IonMenuButton,
} from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import "./style.scss";
import { clearUser, setUser } from "../../store/userSlice";
import { RootState } from "../../store/store";
import { connect } from "react-redux";
import usePopoverService from "../../services/PopoverService";
import { fetchNotifications } from "../../api/notification";
import NotificationList from "../notification";

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

const Header: React.FC = ({ user }: any) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadMessageCount, setUnreadMessageCount] = useState<number>(0);
  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        const fetchedNotifications = await fetchNotifications(user.id,0,10);
        setNotifications(fetchedNotifications.notifications);
        setUnreadMessageCount(fetchedNotifications.unreadMessageCount);
      } catch (error) {
        console.error('Error registering:', error);
        throw error;
      }
    };

    if (user?.id) {
      fetchUserNotifications();
    }
  }, [user]);

  const userName = user ? user.username : 'Guest';
  const profileImage = user && user.profileImage ? user.profileImage : 'https://www.w3schools.com/w3images/avatar2.png';

  const { present, Popover } = usePopoverService();

  return (
    <>
      <IonHeader className="header-container">
        <IonToolbar className="header-toolbar">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="greeting-title">
            Hello {userName}
            <span role="img" aria-label="wave">👋</span>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={(e) =>
                present(
                  e.nativeEvent,
                  <NotificationList user={user} />,
                  async () => {
                    const fetchedNotifications = await fetchNotifications(
                      user.id
                    );
                    setUnreadMessageCount(
                      fetchedNotifications.unreadMessageCount
                    );
                  }
                )
              }
            >
              <div className="notification-icon-container">
                <IonIcon icon={notificationsOutline}
                  className="notification-icon"
                />
                {unreadMessageCount > 0 && (
                  <span className="notification-badge">
                    {unreadMessageCount}
                  </span>
                )}
              </div>
            </IonButton>
            <IonAvatar>
              <img src={profileImage} alt="Profile" />
            </IonAvatar>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <Popover />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const mapDispatchToProps = {
  setUser,
  clearUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
