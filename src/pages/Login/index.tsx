import React, { useState, useEffect } from 'react';
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonRouterLink,
    IonButton,
} from '@ionic/react';
import { personOutline, lockClosedOutline } from 'ionicons/icons';
import CommonInput from '../../components/CommonInput';
import loginImg from '../../assets/login/login-header.png';
import './style.scss';
import { login } from '../../api/auth';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../utils';
import { saveUser, getUser } from '../../services/localStorage.service';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';
import { setAuthState } from '../../store/authSlice';
import { useToast } from '../../contexts/ToastContext';
import { useLoading } from '../../contexts/LoadingContext';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const { showLoading, hideLoading } = useLoading();

    useEffect(() => {
        const storedUser: any = getUser();
        if (storedUser) {
            redirectToDashboard(storedUser.role?.code);
        }
    }, []);

    const validateInputs = () => {
        if (!username) {
            showToast('Username is required', 'danger');
            return false;
        }
        if (!password) {
            showToast('Password is required', 'danger');
            return false;
        }
        return true;
    };

    const handleLogin = async (e: React.FormEvent) => {
        showLoading();
        e.preventDefault();
        if (!validateInputs()) return;

        try {
            const data = await login(username, password);
            saveUser(data);
            dispatch(setUser(data));
            dispatch(setAuthState({ isAuthenticated: true, user: data }));
            redirectToDashboard(data.role?.code);
            hideLoading();
        } catch (err: any) {
            hideLoading();
            if (err.response?.status === 401) {
                showToast('Unauthorized: Invalid username or password', 'danger');
            } else {
                showToast('An unexpected error occurred. Please try again.', 'danger');
            }
        }
    };

    const redirectToDashboard = (role: string) => {
        switch (role) {
            case 'TECHNICIAN':
                history.replace(ROUTES.TECHNICIAN);
                break;
            case 'ENGINEER':
                history.replace(ROUTES.ENGINEER);
                break;
            case 'ADMIN':
                history.replace(ROUTES.ADMIN);
                break;
            case 'HOD':
                history.replace(ROUTES.HOD);
                break;
            default:
                history.replace(ROUTES.DEFAULT);
                break;
        }
    };

    return (
        <IonPage className="login-container">
            <IonContent fullscreen className="no-padding">
                <IonGrid className="no-padding">
                    <IonRow className="ion-justify-content-center no-padding">
                        <IonCol size="12" className="ion-text-center no-padding">
                            <img src={loginImg} className="logo" alt="FixByte Logo" />
                            <h1 className="wel-msg">Welcome</h1>
                            <p>Please login to your account</p>
                        </IonCol>
                    </IonRow>

                    <form onSubmit={handleLogin}>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="10">
                                <CommonInput
                                    placeholder="Username"
                                    onInputChange={(e) => setUsername(e.target.value)}
                                    icon={personOutline}
                                    value={username}
                                />
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="10">
                                <CommonInput
                                    type="password"
                                    placeholder="Password"
                                    onInputChange={(e) => setPassword(e.target.value)}
                                    icon={lockClosedOutline}
                                    value={password}
                                />
                            </IonCol>
                        </IonRow>

                        <IonRow className="ion-justify-content-center submit-btn">
                            <IonCol size="10" className="ion-text-center">
                                <IonButton type="submit" expand="block">
                                    Sign In
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </form>

                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" className="ion-text-center">
                            <IonText color="medium">Forgot Password?</IonText>{' '}
                            <IonRouterLink className="link" href="/contact">
                                Contact Your Manager
                            </IonRouterLink>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;