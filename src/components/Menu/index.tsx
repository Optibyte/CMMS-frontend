import React from 'react';
import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonListHeader,
    IonMenu,
    IonAvatar,
    IonRow,
    IonCol,
    IonText,
    IonFooter,
} from '@ionic/react';

import { useHistory } from 'react-router-dom';
import { logOutOutline, homeOutline, cubeOutline } from 'ionicons/icons';
import './style.scss';
import { ROUTES } from '../../utils';
import { useDispatch, connect } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';
import { clearAuthData } from '../../services/localStorage.service';

const Menu: React.FC = ({ user }: any) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logout());
        clearAuthData();
        history.replace(ROUTES.DEFAULT);
    };

    const profileImage = user && user.profileImage ? user.profileImage : 'https://www.w3schools.com/w3images/avatar2.png';


    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <div className="user-info-container">
                    <IonRow className="ion-align-items-center">
                        <IonCol size="3" className="user-avatar-container">
                            <IonAvatar>
                                <img
                                    src={profileImage}
                                    alt="User Avatar"
                                />
                            </IonAvatar>
                        </IonCol>
                        <IonCol size="9" className="user-details">
                            <IonLabel>
                                <h2 className="username label-title">{user?.username || 'Guest'}</h2>
                                <p className="role label-title">{user?.role?.name || 'Role Unknown'}</p>
                                <IonText>{user?.email || 'No email available'}</IonText>
                            </IonLabel>
                        </IonCol>
                    </IonRow>
                </div>

                <div className="menu-items">
                    <IonItem button lines="none" onClick={() => history.push(user?.role?.name === 'HOD' ? ROUTES.HOD : user?.role?.name === 'ENGINEER' ? ROUTES.ENGINEER : ROUTES.TECHNICIAN)}>
                        <IonIcon slot="start" icon={homeOutline} />
                        <IonLabel>Dashboard</IonLabel>
                    </IonItem>
                    <IonItem button lines="none" onClick={() => history.push(ROUTES.ASSET_HUB)}>
                        <IonIcon slot="start" icon={cubeOutline} />
                        <IonLabel>Asset Management</IonLabel>
                    </IonItem>
                </div>
            </IonContent>

            <IonFooter className="logout-footer">
                <IonItem button lines="none" className="logout-button" onClick={handleLogout}>
                    <IonIcon slot="start" icon={logOutOutline} className="logout-icon" />
                    <IonLabel>Logout</IonLabel>
                </IonItem>
            </IonFooter>
        </IonMenu>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(Menu);