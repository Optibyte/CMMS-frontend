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
} from '@ionic/react';
import {
    settingsOutline,
    syncOutline,
    pulseOutline,
    thermometerOutline,
    colorWandOutline,
    constructOutline,
    scanOutline,
    alertCircleOutline,
    trendingUpOutline,
    pieChartOutline,
    layersOutline
} from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import '../OilFluids/style.scss';

const MechanicalView: React.FC = () => {
    const userRole = useSelector((state: RootState) => state.user?.role?.name || 'TECHNICIAN');
    const [selectedView, setSelectedView] = useState(userRole.toLowerCase());
    const [selectedSubTab, setSelectedSubTab] = useState('belts');
    const [searchTerm, setSearchTerm] = useState('');

    const beltsData = [
        {
            id: 'B1',
            machineCode: 'CNC-015',
            component: 'Main Drive Belt',
            type: 'V-belt B-53',
            installDate: '2025-06-01',
            status: 'good',
            lifeRemaining: '45%',
            tension: 'Optimal',
            alignment: 'Good',
            spares: 4,
            failureRate: 'Low'
        },
        {
            id: 'B2',
            machineCode: 'L-88',
            component: 'Timing Belt',
            type: 'HTD 8M-1280',
            installDate: '2025-01-10',
            status: 'warning', // 80% life reached
            lifeRemaining: '15%',
            tension: 'Loose - Adjustment Req',
            alignment: 'Slight Offset',
            spares: 0, // Out of stock
            failureRate: 'Medium'
        }
    ];

    const bearingsData = [
        {
            id: 'BR1',
            machineCode: 'MOT-01',
            location: 'Front Motor Bearing',
            type: '6305-2RS',
            installDate: '2024-12-15',
            status: 'good',
            vibration: '0.8 mm/s',
            temp: '42°C',
            nextLube: '2026-03-01',
            grease: 'MobilPolyrex EM',
            spares: 12
        },
        {
            id: 'BR2',
            machineCode: 'FAN-09',
            location: 'Drive End Bearing',
            type: '22215 EK',
            installDate: '2025-05-20',
            status: 'overdue', // Replacement soon
            vibration: '4.5 mm/s', // High
            temp: '68°C', // High
            nextLube: '2026-01-25', // Overdue
            grease: 'SKF LGMT 3',
            spares: 2
        }
    ];

    const renderTechnicianView = () => (
        <div className="view-container technician-view">
            <div className="sub-header-segments">
                <IonSegment value={selectedSubTab} onIonChange={e => setSelectedSubTab(e.detail.value as string)}>
                    <IonSegmentButton value="belts">
                        <IonLabel>Belts & Chains</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="bearings">
                        <IonLabel>Bearings</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
            </div>

            <IonRow>
                {selectedSubTab === 'belts' ? beltsData.map(belt => (
                    <IonCol size="12" sizeMd="6" sizeLg="4" key={belt.id}>
                        <IonCard className={`premium-card ${belt.status}`}>
                            <IonCardHeader>
                                <div className="header-top">
                                    <IonBadge color={belt.status === 'warning' ? 'warning' : 'success'}>{belt.status.toUpperCase()}</IonBadge>
                                    <span className="machine-code">{belt.machineCode}</span>
                                </div>
                                <IonCardTitle>{belt.component}</IonCardTitle>
                                <p className="oil-type">{belt.type}</p>
                            </IonCardHeader>
                            <IonCardContent>
                                <div className="data-grid">
                                    <div className="data-item"><IonIcon icon={syncOutline} /><span>Life Remaining: <strong>{belt.lifeRemaining}</strong></span></div>
                                    <div className="data-item"><IonIcon icon={settingsOutline} /><span>Tension: {belt.tension}</span></div>
                                    <div className="data-item"><IonIcon icon={layersOutline} /><span>Spares in Stock: <strong>{belt.spares}</strong></span></div>
                                </div>
                                <div className="actions">
                                    <IonButton fill="clear" color="primary"><IonIcon slot="start" icon={scanOutline} />Record Replace</IonButton>
                                    <IonButton fill="clear" color="secondary">Procedure</IonButton>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                )) : bearingsData.map(bearing => (
                    <IonCol size="12" sizeMd="6" sizeLg="4" key={bearing.id}>
                        <IonCard className={`premium-card ${bearing.status}`}>
                            <IonCardHeader>
                                <div className="header-top">
                                    <IonBadge color={bearing.status === 'overdue' ? 'danger' : 'success'}>{bearing.status.toUpperCase()}</IonBadge>
                                    <span className="machine-code">{bearing.machineCode}</span>
                                </div>
                                <IonCardTitle>{bearing.location}</IonCardTitle>
                                <p className="oil-type">{bearing.type}</p>
                            </IonCardHeader>
                            <IonCardContent>
                                <div className="data-grid">
                                    <div className="data-item"><IonIcon icon={pulseOutline} /><span>Vibration: <strong>{bearing.vibration}</strong></span></div>
                                    <div className="data-item"><IonIcon icon={thermometerOutline} /><span>Temp: <strong>{bearing.temp}</strong></span></div>
                                    <div className="data-item"><IonIcon icon={colorWandOutline} /><span>Grease: {bearing.grease}</span></div>
                                </div>
                                <div className="actions">
                                    <IonButton fill="clear" color="primary"><IonIcon slot="start" icon={scanOutline} />Record Lubrication</IonButton>
                                </div>
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
                            <IonIcon icon={pieChartOutline} className="stat-icon" />
                            <h3>Mechanical Spend YTD</h3>
                            <h2>$42,800</h2>
                            <p>Belts: $12k | Bearings: $30.8k</p>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="4">
                    <IonCard className="stats-card gradient-2">
                        <IonCardContent>
                            <IonIcon icon={alertCircleOutline} className="stat-icon" />
                            <h3>Premature Failures</h3>
                            <h2>5 <small>This Month</small></h2>
                            <p>Target: &lt; 2</p>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="4">
                    <IonCard className="stats-card gradient-3">
                        <IonCardContent>
                            <IonIcon icon={constructOutline} className="stat-icon" />
                            <h3>Spare Stock Value</h3>
                            <h2>$156,000</h2>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>

            <h2 className="section-title">Component Inventory by Size</h2>
            <IonCard className="analysis-table-card">
                <IonCardContent>
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Size / Spec</th>
                                <th>In Stock</th>
                                <th>Critical Min</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>V-Belts</td>
                                <td>B-53</td>
                                <td>4</td>
                                <td>10</td>
                                <td><IonBadge color="warning">LOW</IonBadge></td>
                            </tr>
                            <tr>
                                <td>Ball Bearings</td>
                                <td>6305-2RS</td>
                                <td>12</td>
                                <td>5</td>
                                <td><IonBadge color="success">OK</IonBadge></td>
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
                    <IonCardTitle>Engineering Analysis - Component Lifecycle</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>Machine Code</th>
                                <th>Actual Life</th>
                                <th>Expected Life</th>
                                <th>Health Score</th>
                                <th>Recommendation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {beltsData.map(belt => (
                                <tr key={belt.id}>
                                    <td>{belt.machineCode} (Belt)</td>
                                    <td>4,200 hrs</td>
                                    <td>5,000 hrs</td>
                                    <td><span className="status-pill good">84%</span></td>
                                    <td>Continue Monitor</td>
                                </tr>
                            ))}
                            {bearingsData.map(bearing => (
                                <tr key={bearing.id}>
                                    <td>{bearing.machineCode} (Bearing)</td>
                                    <td>8,500 hrs</td>
                                    <td>10,000 hrs</td>
                                    <td><span className={`status-pill ${bearing.status === 'overdue' ? 'bad' : 'good'}`}>
                                        {bearing.status === 'overdue' ? '42%' : '85%'}
                                    </span></td>
                                    <td>{bearing.status === 'overdue' ? 'Schedule Replacement' : 'Routine Lube'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </IonCardContent>
            </IonCard>

            <IonRow>
                <IonCol size="12">
                    <IonCard className="info-card">
                        <IonCardHeader>
                            <IonCardTitle>Root Cause Analysis & Upgrades</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className="opt-item warning">
                                <IonIcon icon={alertCircleOutline} color="warning" />
                                <div>
                                    <h6>Misalignment Trend - Fan Unit FAN-09</h6>
                                    <p>Vibration patterns indicate recurring structural misalignment causing bearing fatigue.</p>
                                </div>
                            </div>
                            <div className="opt-item highlight">
                                <IonIcon icon={trendingUpOutline} color="primary" />
                                <div>
                                    <h6>Upgrade to Poly-V Belts - CNC Section</h6>
                                    <p>Standard to Poly-V conversion could reduce maintenance frequency by 40%.</p>
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
                    <IonTitle>Mechanical Components</IonTitle>
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
                            placeholder="Search Component or Machine..."
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

export default MechanicalView;
