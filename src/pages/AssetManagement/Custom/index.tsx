import React, { useState } from 'react';
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonIcon,
    IonSearchbar,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonChip,
} from '@ionic/react';
import {
    diamondOutline,
    shieldCheckmarkOutline,
    documentTextOutline,
    constructOutline,
    peopleOutline,
    layersOutline,
    scanOutline,
    alertCircleOutline,
    trendingUpOutline,
    settingsOutline,
    infiniteOutline,
    helpCircleOutline
} from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import '../OilFluids/style.scss';

const CustomEquipmentView: React.FC = () => {
    const userRole = useSelector((state: RootState) => state.user?.role?.name || 'TECHNICIAN');
    const [selectedView, setSelectedView] = useState(userRole.toLowerCase());
    const [searchTerm, setSearchTerm] = useState('');

    const customData = [
        {
            id: 'C1',
            machineCode: 'SPEC-X1',
            name: 'Plasma Arc Deposition Unit',
            description: 'Custom-built surface treatment chamber with PLC integrated control.',
            specs: '10kVA, Vacuum Grade: 10^-6 Torr',
            skills: ['Plasma Advanced (Level 2)'],
            status: 'certified', // am I certified?
            lastMod: '2025-12-05',
            engineerContact: 'Dr. Sarah Connor (In-house)',
            modHistory: 'Upgraded vacuum pump to H-Series Jan 2025.',
            spares: 'Specialized Electrodes (Lead Time: 12 weeks)'
        },
        {
            id: 'C2',
            machineCode: 'ASSEM-04',
            name: 'Pneumatic Pick-and-Place (Custom)',
            description: 'In-house designed assembly bot with custom grippers.',
            specs: '6-Axis, 5kg Payload',
            skills: ['Robotics Basic'],
            status: 'not-certified',
            lastMod: '2024-06-15',
            engineerContact: 'James Wilson',
            modHistory: 'Sensor array replaced with laser profile sensors May 2024.',
            spares: 'Custom 3D Printed Fingers'
        }
    ];

    const renderTechnicianView = () => (
        <div className="view-container technician-view">
            <IonRow>
                {customData.map(item => (
                    <IonCol size="12" sizeMd="6" key={item.id}>
                        <IonCard className={`premium-card ${item.status === 'certified' ? 'good' : 'overdue'}`}>
                            <IonCardHeader>
                                <div className="header-top">
                                    <IonBadge color={item.status === 'certified' ? 'success' : 'danger'}>
                                        {item.status === 'certified' ? 'CERTIFIED TO WORK' : 'TRAINING REQUIRED'}
                                    </IonBadge>
                                    <span className="machine-code">{item.machineCode}</span>
                                </div>
                                <IonCardTitle>{item.name}</IonCardTitle>
                                <p className="oil-type">{item.description}</p>
                            </IonCardHeader>
                            <IonCardContent>
                                <div className="data-grid">
                                    <div className="data-item"><IonIcon icon={shieldCheckmarkOutline} /><span>Required Skill: <strong>{item.skills.join(', ')}</strong></span></div>
                                    <div className="data-item"><IonIcon icon={documentTextOutline} /><span>Contact: <strong>{item.engineerContact}</strong></span></div>
                                    <div className="data-item"><IonIcon icon={infiniteOutline} /><span>Spec: {item.specs}</span></div>
                                </div>
                                <div className="actions">
                                    <IonButton fill="clear" color="primary" disabled={item.status !== 'certified'}>
                                        <IonIcon slot="start" icon={scanOutline} />
                                        Work on Machine
                                    </IonButton>
                                    <IonButton fill="clear" color="secondary">Docs & Diagrams</IonButton>
                                </div>
                                {item.status !== 'certified' && (
                                    <div className="alert-box danger" style={{ marginTop: '10px' }}>
                                        <IonIcon icon={alertCircleOutline} />
                                        <small>Warning: You are not certified for this equipment. Request training first.</small>
                                    </div>
                                )}
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                ))}
            </IonRow>
        </div>
    );

    const renderHODView = () => (
        <div className="view-container hod-view">
            <IonRow>
                <IonCol size="12" sizeMd="4">
                    <IonCard className="stats-card gradient-1">
                        <IonCardContent>
                            <IonIcon icon={peopleOutline} className="stat-icon" />
                            <h3>Certified Technicians</h3>
                            <h2>4 <small>Current</small></h2>
                            <p>Risk: High (Single Person Dependency on SPEC-X1)</p>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="4">
                    <IonCard className="stats-card gradient-2">
                        <IonCardContent>
                            <IonIcon icon={layersOutline} className="stat-icon" />
                            <h3>Custom Spares Lead Time</h3>
                            <h2>14 <small>Weeks Avg</small></h2>
                            <p>Procurement Risk: Moderate</p>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="4">
                    <IonCard className="stats-card gradient-3">
                        <IonCardContent>
                            <IonIcon icon={documentTextOutline} className="stat-icon" />
                            <h3>Documentation Score</h3>
                            <h2>92%</h2>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>

            <h2 className="section-title">Department Specialized Skill Matrix</h2>
            <IonCard className="analysis-table-card">
                <IonCardContent>
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>Equipment</th>
                                <th>Primary Expert</th>
                                <th>Certified Backups</th>
                                <th>Risk Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Plasma SPEC-X1</td>
                                <td>Alice Cooper</td>
                                <td>None</td>
                                <td><IonBadge color="danger">CRITICAL</IonBadge></td>
                            </tr>
                            <tr>
                                <td>ASSEM-04 Bot</td>
                                <td>Bob Martin</td>
                                <td>James Smith</td>
                                <td><IonBadge color="success">STABLE</IonBadge></td>
                            </tr>
                        </tbody>
                    </table>
                </IonCardContent>
            </IonCard>
        </div>
    );

    const renderEngineerView = () => (
        <div className="view-container engineer-view">
            <IonCard className="analysis-table-card">
                <IonCardHeader>
                    <IonCardTitle>In-house Engineering & Modification History</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>Machine</th>
                                <th>Design Intent</th>
                                <th>Mod History</th>
                                <th>Obsolescence Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customData.map(item => (
                                <tr key={item.id}>
                                    <td><strong>{item.machineCode}</strong></td>
                                    <td>{item.specs}</td>
                                    <td>{item.modHistory}</td>
                                    <td><span className="status-pill good">Supported</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </IonCardContent>
            </IonCard>

            <IonRow>
                <IonCol size="12" sizeMd="6">
                    <IonCard className="info-card">
                        <IonCardHeader>
                            <IonCardTitle>Continuous Improvement (Backlog)</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className="opt-item warning">
                                <IonIcon icon={helpCircleOutline} color="warning" />
                                <div>
                                    <h6>Reverse Engineering SPEC-X1 Controller</h6>
                                    <p>OEM no longer supports this legacy PLC model. In-house conversion required.</p>
                                </div>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                    <IonCard className="info-card">
                        <IonCardHeader>
                            <IonCardTitle>FMEA / Failure Mode Analysis</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className="opt-item highlight">
                                <IonIcon icon={trendingUpOutline} color="primary" />
                                <div>
                                    <h6>Optimization of ASSEM-04 Gripper</h6>
                                    <p>Identified stress points in current finger design causing premature wear (failure every 3 months).</p>
                                </div>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>
        </div>
    );

    return (
        <IonPage id="oil-fluids-page">
            <IonHeader className="no-shadow">
                <IonToolbar className="blurred-toolbar">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Custom Equipment</IonTitle>
                    <div className="role-switcher" slot="end">
                        <IonSegment value={selectedView} onIonChange={e => setSelectedView(e.detail.value as string)}>
                            <IonSegmentButton value="technician">
                                <IonLabel>Tech</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="hod">
                                <IonLabel>HOD</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="engineer">
                                <IonLabel>Eng</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </div>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="asset-content">
                <div className="content-padding">
                    <div className="search-row">
                        <IonSearchbar
                            placeholder="Search Custom Asset or Spec..."
                            value={searchTerm}
                            onIonChange={e => setSearchTerm(e.detail.value!)}
                            className="premium-search"
                        />
                    </div>

                    {selectedView === 'technician' && renderTechnicianView()}
                    {selectedView === 'hod' && renderHODView()}
                    {selectedView === 'engineer' && renderEngineerView()}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default CustomEquipmentView;
