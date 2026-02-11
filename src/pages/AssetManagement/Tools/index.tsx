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
    constructOutline,
    timeOutline,
    locationOutline,
    calendarOutline,
    alertCircleOutline,
    checkmarkCircleOutline,
    scanOutline,
    statsChartOutline,
    peopleOutline,
    receiptOutline,
    settingsOutline,
    thermometerOutline
} from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import '../OilFluids/style.scss'; // Reuse base premium styles

const ToolsView: React.FC = () => {
    const userRole = useSelector((state: RootState) => state.user?.role?.name || 'TECHNICIAN');
    const [selectedView, setSelectedView] = useState(userRole.toLowerCase());
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data for Tools
    const tools = [
        {
            id: 'T1',
            toolCode: 'TW-250',
            toolName: 'Torque Wrench 0-200 Nm',
            category: 'Hand Tools / Measuring',
            location: 'Checked out to me',
            status: 'in-use', // good, damaged, calibration-due
            checkoutDate: '2026-02-05',
            returnDue: '2026-02-10',
            calibrationDue: '2026-06-15',
            condition: 'Good',
            primaryUsage: ['CNC-015', 'CNC-016'],
            lastUsed: '2026-02-07 09:30',
            spec: 'Accuracy +/- 4%',
            utilization: '85%'
        },
        {
            id: 'T2',
            toolCode: 'DMM-01',
            toolName: 'Digital Multimeter',
            category: 'Electronic Instruments',
            location: 'Tool Crib',
            status: 'available',
            checkoutDate: '-',
            returnDue: '-',
            calibrationDue: '2026-02-01', // Overdue
            condition: 'Needs Calibration',
            primaryUsage: ['Electric Panels'],
            lastUsed: '2026-01-20',
            spec: 'True RMS, CAT IV',
            utilization: '40%'
        },
        {
            id: 'T3',
            toolCode: 'VA-900',
            toolName: 'Vibration Analyzer',
            category: 'Predictive Tools',
            location: 'Checked out to John D.',
            status: 'checked-out',
            checkoutDate: '2026-02-01',
            returnDue: '2026-02-05', // Overdue return
            calibrationDue: '2026-11-20',
            condition: 'Good',
            primaryUsage: ['Motors', 'Bearings'],
            lastUsed: '2026-02-06',
            spec: 'Frequency 2Hz-20kHz',
            utilization: '95%'
        }
    ];

    const renderTechnicianView = () => (
        <div className="view-container technician-view">
            <IonRow>
                {tools.map(tool => (
                    <IonCol size="12" sizeMd="6" sizeLg="4" key={tool.id}>
                        <IonCard className={`premium-card ${tool.status === 'available' ? 'good' : tool.status === 'in-use' ? 'warning' : 'overdue'}`}>
                            <div className="card-glass-overlay"></div>
                            <IonCardHeader>
                                <div className="header-top">
                                    <IonBadge color={tool.status === 'available' ? 'success' : tool.status === 'in-use' ? 'primary' : 'danger'}>
                                        {tool.status.replace('-', ' ').toUpperCase()}
                                    </IonBadge>
                                    <span className="machine-code">{tool.toolCode}</span>
                                </div>
                                <IonCardTitle>{tool.toolName}</IonCardTitle>
                                <p className="oil-type">{tool.category}</p>
                            </IonCardHeader>
                            <IonCardContent>
                                <div className="data-grid">
                                    <div className="data-item">
                                        <IonIcon icon={locationOutline} />
                                        <span>Location: <strong>{tool.location}</strong></span>
                                    </div>
                                    <div className="data-item">
                                        <IonIcon icon={calendarOutline} />
                                        <span>Return Due: <strong>{tool.returnDue}</strong></span>
                                    </div>
                                    <div className="data-item">
                                        <IonIcon icon={thermometerOutline} />
                                        <span>Calibration Due: <strong>{tool.calibrationDue}</strong></span>
                                    </div>
                                    <div className="data-item">
                                        <IonIcon icon={settingsOutline} />
                                        <span>Condition: {tool.condition}</span>
                                    </div>
                                </div>
                                <div className="actions">
                                    {tool.status === 'available' ? (
                                        <IonButton fill="clear" color="primary">
                                            <IonIcon slot="start" icon={scanOutline} />
                                            Check Out
                                        </IonButton>
                                    ) : (
                                        <IonButton fill="clear" color="success">
                                            <IonIcon slot="start" icon={scanOutline} />
                                            Return Tool
                                        </IonButton>
                                    )}
                                    <IonButton fill="clear" color="danger">Report Damage</IonButton>
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
                <IonCol size="12" sizeMd="3">
                    <IonCard className="stats-card gradient-1">
                        <IonCardContent>
                            <IonIcon icon={constructOutline} className="stat-icon" />
                            <h3>Total Tools</h3>
                            <h2>450 <small>Units</small></h2>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="3">
                    <IonCard className="stats-card gradient-2">
                        <IonCardContent>
                            <IonIcon icon={timeOutline} className="stat-icon" />
                            <h3>Overdue Returns</h3>
                            <h2>8 <small>Tools</small></h2>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="3">
                    <IonCard className="stats-card gradient-3">
                        <IonCardContent>
                            <IonIcon icon={statsChartOutline} className="stat-icon" />
                            <h3>Utilization Rate</h3>
                            <h2>72% <small>Avg</small></h2>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="3">
                    <IonCard className="stats-card" style={{ background: '#666' }}>
                        <IonCardContent>
                            <IonIcon icon={receiptOutline} className="stat-icon" />
                            <h3>Calibration Compliance</h3>
                            <h2>94%</h2>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>

            <h2 className="section-title">Technician Accountability</h2>
            <IonCard className="analysis-table-card">
                <IonCardContent>
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>Tool</th>
                                <th>Checked Out By</th>
                                <th>Duration</th>
                                <th>Return Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>VA-900 Vibration Analyzer</td>
                                <td>John Doe</td>
                                <td>6 Days</td>
                                <td><IonBadge color="danger">OVERDUE</IonBadge></td>
                            </tr>
                            <tr>
                                <td>TW-250 Torque Wrench</td>
                                <td>Technician (Me)</td>
                                <td>2 Days</td>
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
                    <IonCardTitle>Technical Tool Management</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>Tool Code</th>
                                <th>Specifications</th>
                                <th>Accuracy Drift</th>
                                <th>Lifecycle Health</th>
                                <th>Machine Compatibility</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tools.map(tool => (
                                <tr key={tool.id}>
                                    <td><strong>{tool.toolCode}</strong></td>
                                    <td>{tool.spec}</td>
                                    <td><span className="status-pill good">+0.2%</span></td>
                                    <td>
                                        <div className="progress-bar-small">
                                            <div className="progress-fill" style={{ width: tool.utilization, background: 'var(--primary-color)' }}></div>
                                        </div>
                                    </td>
                                    <td>{tool.primaryUsage.join(', ')}</td>
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
                            <IonCardTitle>Calibration Trends</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className="opt-item">
                                <IonIcon icon={alertCircleOutline} color="danger" />
                                <div>
                                    <h6>TW-250 Recalibration Needed</h6>
                                    <p>Drift analysis shows 2% increase in error rate over last 3 months.</p>
                                </div>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                    <IonCard className="info-card">
                        <IonCardHeader>
                            <IonCardTitle>Ergonomic & Safety Assessment</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className="opt-item highlight">
                                <IonIcon icon={checkmarkCircleOutline} color="secondary" />
                                <div>
                                    <h6>Pneumatic Drills - All Compliant</h6>
                                    <p>Safety guards and vibration dampening verified for all units in category.</p>
                                </div>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>
        </div>
    );

    return (
        <IonPage id="oil-fluids-page"> {/* Reusing ID for styles */}
            <IonHeader className="no-shadow">
                <IonToolbar className="blurred-toolbar">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Tools & Equipment</IonTitle>
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
                            placeholder="Search Tool Code or Name..."
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

export default ToolsView;
