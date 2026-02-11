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
    flashOutline,
    speedometerOutline,
    thermometerOutline,
    pulseOutline,
    optionsOutline,
    constructOutline,
    scanOutline,
    calendarOutline,
    alertCircleOutline,
    trendingUpOutline,
    statsChartOutline,
    bulbOutline,
    hardwareChipOutline
} from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import '../OilFluids/style.scss';

const ElectricalView: React.FC = () => {
    const userRole = useSelector((state: RootState) => state.user?.role?.name || 'TECHNICIAN');
    const [selectedView, setSelectedView] = useState(userRole.toLowerCase());
    const [selectedSubTab, setSelectedSubTab] = useState('motors');
    const [searchTerm, setSearchTerm] = useState('');

    const motorsData = [
        {
            id: 'M1',
            machineCode: 'CNC-015',
            name: 'Spindle Motor',
            specs: '15 HP AC, 400V, 3000 RPM',
            serial: 'MOT-SN-9921',
            status: 'good',
            currentDraw: '12.5A',
            temp: '55°C',
            vibration: '1.2 mm/s',
            megger: '500 MΩ',
            lastPM: '2026-01-10'
        },
        {
            id: 'M2',
            machineCode: 'FAN-09',
            name: 'Exhaust Fan Motor',
            specs: '5 HP AC, 380V, 1440 RPM',
            serial: 'MOT-SN-4410',
            status: 'warning', // Overload detected
            currentDraw: '9.8A (Rated 7.5A)',
            temp: '82°C',
            vibration: '3.8 mm/s',
            megger: '50 MΩ (Degrading)',
            lastPM: '2025-11-20'
        }
    ];

    const sensorsData = [
        {
            id: 'S1',
            machineCode: 'CNC-015',
            tag: 'PX-101',
            name: 'Proximity Sensor',
            type: 'Inductive',
            status: 'working',
            lastCal: '2025-12-01',
            readings: 'Stable',
            spares: 5
        },
        {
            id: 'S2',
            machineCode: 'HYD-042',
            tag: 'PT-505',
            name: 'Pressure Transducer',
            type: 'Analog 4-20mA',
            status: 'faulty',
            lastCal: '2025-06-15',
            readings: 'Erratic / Drifted',
            spares: 0 // Out of stock
        }
    ];

    const renderTechnicianView = () => (
        <div className="view-container technician-view">
            <div className="sub-header-segments">
                <IonSegment value={selectedSubTab} onIonChange={e => setSelectedSubTab(e.detail.value as string)}>
                    <IonSegmentButton value="motors">
                        <IonLabel>Motors</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="sensors">
                        <IonLabel>Sensors & Control</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
            </div>

            <IonRow>
                {selectedSubTab === 'motors' ? motorsData.map(motor => (
                    <IonCol size="12" sizeMd="6" sizeLg="4" key={motor.id}>
                        <IonCard className={`premium-card ${motor.status}`}>
                            <IonCardHeader>
                                <div className="header-top">
                                    <IonBadge color={motor.status === 'warning' ? 'warning' : 'success'}>{motor.status.toUpperCase()}</IonBadge>
                                    <span className="machine-code">{motor.machineCode}</span>
                                </div>
                                <IonCardTitle>{motor.name}</IonCardTitle>
                                <p className="oil-type">{motor.specs}</p>
                            </IonCardHeader>
                            <IonCardContent>
                                <div className="data-grid">
                                    <div className="data-item"><IonIcon icon={speedometerOutline} /><span>Current: <strong>{motor.currentDraw}</strong></span></div>
                                    <div className="data-item"><IonIcon icon={thermometerOutline} /><span>Temp: <strong>{motor.temp}</strong></span></div>
                                    <div className="data-item"><IonIcon icon={flashOutline} /><span>Insulation: {motor.megger}</span></div>
                                </div>
                                <div className="actions">
                                    <IonButton fill="clear" color="primary"><IonIcon slot="start" icon={scanOutline} />Record Test</IonButton>
                                    <IonButton fill="clear" color="secondary">Thermal Image</IonButton>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                )) : sensorsData.map(sensor => (
                    <IonCol size="12" sizeMd="6" sizeLg="4" key={sensor.id}>
                        <IonCard className={`premium-card ${sensor.status === 'working' ? 'good' : 'overdue'}`}>
                            <IonCardHeader>
                                <div className="header-top">
                                    <IonBadge color={sensor.status === 'working' ? 'success' : 'danger'}>{sensor.status.toUpperCase()}</IonBadge>
                                    <span className="machine-code">{sensor.tag}</span>
                                </div>
                                <IonCardTitle>{sensor.name}</IonCardTitle>
                                <p className="oil-type">{sensor.machineCode} - {sensor.type}</p>
                            </IonCardHeader>
                            <IonCardContent>
                                <div className="data-grid">
                                    <div className="data-item"><IonIcon icon={optionsOutline} /><span>Readings: <strong>{sensor.readings}</strong></span></div>
                                    <div className="data-item"><IonIcon icon={calendarOutline} /><span>Last Cal: {sensor.lastCal}</span></div>
                                    <div className="data-item"><IonIcon icon={hardwareChipOutline} /><span>Spares: <strong>{sensor.spares}</strong></span></div>
                                </div>
                                <div className="actions">
                                    <IonButton fill="clear" color="primary"><IonIcon slot="start" icon={scanOutline} />Replace / Cal</IonButton>
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
                    <IonCard className="stats-card" style={{ background: '#ff9800' }}>
                        <IonCardContent>
                            <IonIcon icon={flashOutline} className="stat-icon" />
                            <h3>Electrical Failures</h3>
                            <h2>3 <small>This Week</small></h2>
                            <p>Motors: 1 | Sensors: 2</p>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="4">
                    <IonCard className="stats-card gradient-2">
                        <IonCardContent>
                            <IonIcon icon={bulbOutline} className="stat-icon" />
                            <h3>Energy Efficiency</h3>
                            <h2>82% <small>Index</small></h2>
                            <p>Target: 90%</p>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="4">
                    <IonCard className="stats-card gradient-1">
                        <IonCardContent>
                            <IonIcon icon={hardwareChipOutline} className="stat-icon" />
                            <h3>Automation Spares</h3>
                            <h2>$45k <small>Value</small></h2>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>

            <h2 className="section-title">Critical Automation Assets</h2>
            <IonCard className="analysis-table-card">
                <IonCardContent>
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>Asset</th>
                                <th>Machine</th>
                                <th>Calibration Compliance</th>
                                <th>Obsolescence Risk</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pressure Transducer PT-505</td>
                                <td>HYD-042</td>
                                <td><IonBadge color="danger">OVERDUE</IonBadge></td>
                                <td><IonBadge color="warning">HIGH</IonBadge></td>
                            </tr>
                            <tr>
                                <td>Spindle Motor M1</td>
                                <td>CNC-015</td>
                                <td><IonBadge color="success">OK</IonBadge></td>
                                <td><IonBadge color="success">LOW</IonBadge></td>
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
                    <IonCardTitle>Power Quality & Efficiency Analytics</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>Motor</th>
                                <th>Load Factor</th>
                                <th>Efficiency</th>
                                <th>Harmonics THD</th>
                                <th>Thermal Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>M1 Spindle</td>
                                <td>75% (Ideal)</td>
                                <td>94% (IE3)</td>
                                <td><span className="status-pill good">2.5%</span></td>
                                <td>Uniform</td>
                            </tr>
                            <tr>
                                <td>M2 Exhaust</td>
                                <td>115% (Overload)</td>
                                <td>78% (IE1)</td>
                                <td><span className="status-pill bad">8.2%</span></td>
                                <td>Hot Spot (Bearing End)</td>
                            </tr>
                        </tbody>
                    </table>
                </IonCardContent>
            </IonCard>

            <IonRow>
                <IonCol size="12" sizeMd="6">
                    <IonCard className="info-card">
                        <IonCardHeader>
                            <IonCardTitle>Predictive Fault Detection (Sensor-Based)</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className="opt-item warning">
                                <IonIcon icon={pulseOutline} color="warning" />
                                <div>
                                    <h6>Erratic Pressure Signal - HYD-042</h6>
                                    <p>Pattern analysis suggests cavitation issues rather than sensor malfunction.</p>
                                </div>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                    <IonCard className="info-card">
                        <IonCardHeader>
                            <IonCardTitle>Modernization Strategy</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className="opt-item highlight">
                                <IonIcon icon={trendingUpOutline} color="primary" />
                                <div>
                                    <h6>VFD Installation - M2 Exhaust</h6>
                                    <p>Variable speed control could save $1,200/year in energy costs for this motor.</p>
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
                    <IonTitle>Electrical Components</IonTitle>
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
                            placeholder="Search Motor or Sensor..."
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

export default ElectricalView;
