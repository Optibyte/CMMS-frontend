import React, { useEffect, useState } from 'react';
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonLabel
} from '@ionic/react';
import PMOverview from '../PMOverview';
import WorkOrderTable from '../WorkOrderTable';
import './style.scss';

const HodDashboard = (props: any) => {
    return (
        <IonPage className="hod-dashboard">
            <IonHeader className="page-header-container">
                <IonToolbar>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <PMOverview />
                <br />
                <hr />
                <br />
                <IonLabel className='label-title'>
                    Work Order Pending Approvals
                </IonLabel>
                <WorkOrderTable />
            </IonContent>
        </IonPage>
    );
};

export default HodDashboard;