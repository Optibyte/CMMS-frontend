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
import OilFluidsView from './pages/AssetManagement/OilFluids';
import AssetHub from './pages/AssetManagement/AssetHub';
import ToolsView from './pages/AssetManagement/Tools';
import MechanicalView from './pages/AssetManagement/Mechanical';
import ElectricalView from './pages/AssetManagement/Electrical';
import FiltersView from './pages/AssetManagement/Filters';
import CustomEquipmentView from './pages/AssetManagement/Custom';
import MasterAnalysisView from './pages/AssetManagement/MasterAnalysis';

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
                            <Route path="/asset-management/oil-fluids" component={OilFluidsView} exact />
                            <Route path="/asset-management" component={AssetHub} exact />
                            <Route path="/asset-management/tools" component={ToolsView} exact />
                            <Route path="/asset-management/mechanical" component={MechanicalView} exact />
                            <Route path="/asset-management/electrical" component={ElectricalView} exact />
                            <Route path="/asset-management/filters" component={FiltersView} exact />
                            <Route path="/asset-management/custom" component={CustomEquipmentView} exact />
                            <Route path="/asset-management/master" component={MasterAnalysisView} exact />
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
