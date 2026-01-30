import React from 'react';
import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

import Login from './pages/Login';
import Header from './components/Header';
import Menu from './components/Menu';
import TechnicianDashboard from './pages/TechView/TechnicianDashboard';
import EngineerDashboard from './pages/Engineer/EngineerDashboard';
import HodDashboard from './pages/Hod/HodDashboard';

const AppRoutes: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <IonReactRouter>
            <IonSplitPane contentId="main">
                {isAuthenticated && (
                    <>
                        <Header />
                        <Menu />
                    </>
                )}
                <IonRouterOutlet id="main">
                    <Route path="/login" component={Login} exact />

                    {isAuthenticated ? (
                        <>
                            <Route path="/hod-view" component={HodDashboard} exact />
                            <Route path="/engineer-view" component={EngineerDashboard} exact />
                            <Route path="/tech-view" component={TechnicianDashboard} exact />
                        </>
                    ) : (
                        <Redirect to="/login" />
                    )}
                </IonRouterOutlet>
            </IonSplitPane>
        </IonReactRouter>
    );
};

export default AppRoutes;
