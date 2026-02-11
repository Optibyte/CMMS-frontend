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
    IonItem,
    IonList,
    IonText
} from '@ionic/react';
import {
    layersOutline,
    statsChartOutline,
    filterOutline,
    downloadOutline,
    swapHorizontalOutline,
    constructOutline,
    shieldCheckmarkOutline,
    alertCircleOutline,
    trendingUpOutline,
    pulseOutline,
    cashOutline,
    checkmarkCircleOutline
} from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import '../OilFluids/style.scss';

const MasterAnalysisView: React.FC = () => {
    const userRole = useSelector((state: RootState) => state.user?.role?.name || 'TECHNICIAN');
    const [selectedView, setSelectedView] = useState(userRole.toLowerCase());
    const [searchTerm, setSearchTerm] = useState('');

    const allAssets = [
        { code: 'CNC-015', name: 'VMC Machine', category: 'Mechanical', status: 'Active', health: 88, technician: 'John Doe', tasks: 2, cost: '$1,200', uptime: '98%' },
        { code: 'MOT-01', name: 'Spindle Motor', category: 'Electrical', status: 'Warning', health: 65, technician: 'Alice Smith', tasks: 1, cost: '$450', uptime: '92%' },
        { code: 'SPEC-X1', name: 'Plasma Chamber', category: 'Custom', status: 'Critical', health: 42, technician: 'Me', tasks: 5, cost: '$8,900', uptime: '85%' },
        { code: 'TW-250', name: 'Torque Wrench', category: 'Tools', status: 'Active', health: 95, technician: 'Me', tasks: 0, cost: '$50', uptime: '100%' }
    ];

    const renderTechnicianView = () => (
        <div className="view-container technician-view">
            <h2 className="section-title">My Assigned Master List</h2>
            <IonRow>
                {allAssets.filter(a => a.technician === 'Me' || a.technician === 'John Doe').map(asset => (
                    <IonCol size="12" key={asset.code}>
                        <IonCard className={`premium-card ${asset.status.toLowerCase() === 'critical' ? 'overdue' : asset.status.toLowerCase() === 'warning' ? 'warning' : 'good'}`}>
                            <div className="card-glass-overlay"></div>
                            <IonCardContent style={{ padding: '20px' }}>
                                <IonRow className="ion-align-items-center">
                                    <IonCol size="2" sizeMd="1">
                                        <div className="icon-wrapper-small" style={{ background: 'var(--primary-color)', color: '#fff', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <IonIcon icon={constructOutline} />
                                        </div>
                                    </IonCol>
                                    <IonCol size="10" sizeMd="3">
                                        <IonText color="dark">
                                            <h4 style={{ margin: 0, fontWeight: 700 }}>{asset.code}</h4>
                                            <p style={{ margin: 0, fontSize: '0.85rem' }}>{asset.name}</p>
                                        </IonText>
                                    </IonCol>
                                    <IonCol size="6" sizeMd="2">
                                        <IonBadge color="medium">{asset.category}</IonBadge>
                                    </IonCol>
                                    <IonCol size="6" sizeMd="2">
                                        <IonText color={asset.health < 50 ? 'danger' : asset.health < 80 ? 'warning' : 'success'}>
                                            <strong>Health: {asset.health}%</strong>
                                        </IonText>
                                    </IonCol>
                                    <IonCol size="12" sizeMd="4" className="ion-text-end">
                                        <IonButton size="small" fill="solid" color="primary">Start Work</IonButton>
                                        <IonButton size="small" fill="outline">Details</IonButton>
                                    </IonCol>
                                </IonRow>
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
                <IonCol size="6" sizeMd="2">
                    <IonCard className="stats-card gradient-1" style={{ minHeight: '120px' }}>
                        <IonCardContent>
                            <h3>Total Assets</h3>
                            <h2>1,420</h2>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="6" sizeMd="2">
                    <IonCard className="stats-card gradient-2" style={{ minHeight: '120px' }}>
                        <IonCardContent>
                            <h3>Total Value</h3>
                            <h2>$4.2M</h2>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="6" sizeMd="2">
                    <IonCard className="stats-card gradient-3" style={{ minHeight: '120px' }}>
                        <IonCardContent>
                            <h3>Cost MTD</h3>
                            <h2>$85k</h2>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="6" sizeMd="2">
                    <IonCard className="stats-card" style={{ minHeight: '120px', background: '#4caf50' }}>
                        <IonCardContent>
                            <h3>Compliance</h3>
                            <h2>96%</h2>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="4">
                    <IonCard className="stats-card" style={{ minHeight: '120px', background: '#333' }}>
                        <IonCardContent>
                            <IonRow>
                                <IonCol size="6">
                                    <h3>Critical Tasks</h3>
                                    <h2>24</h2>
                                </IonCol>
                                <IonCol size="6" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3>Technicians</h3>
                                    <h2>18</h2>
                                </IonCol>
                            </IonRow>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>

            <div className="table-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
                <h2 className="section-title" style={{ margin: 0 }}>Department Inventory</h2>
                <div className="buttons">
                    <IonButton fill="outline" size="small"><IonIcon slot="start" icon={filterOutline} />Filter</IonButton>
                    <IonButton fill="outline" size="small"><IonIcon slot="start" icon={downloadOutline} />Export</IonButton>
                    <IonButton fill="solid" size="small" color="primary"><IonIcon slot="start" icon={swapHorizontalOutline} />Bulk Reassign</IonButton>
                </div>
            </div>

            <IonCard className="analysis-table-card">
                <IonCardContent>
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>Machine Code</th>
                                <th>Asset Name</th>
                                <th>Category</th>
                                <th>Technician</th>
                                <th>Health</th>
                                <th>Cost (MTD)</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allAssets.map(asset => (
                                <tr key={asset.code}>
                                    <td><strong>{asset.code}</strong></td>
                                    <td>{asset.name}</td>
                                    <td>{asset.category}</td>
                                    <td>{asset.technician}</td>
                                    <td>
                                        <div className="progress-bar-small">
                                            <div className="progress-fill" style={{ width: `${asset.health}%`, background: asset.health < 50 ? 'red' : asset.health < 80 ? 'orange' : 'green' }}></div>
                                        </div>
                                    </td>
                                    <td>{asset.cost}</td>
                                    <td><IonBadge color={asset.status === 'Active' ? 'success' : asset.status === 'Warning' ? 'warning' : 'danger'}>{asset.status}</IonBadge></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </IonCardContent>
            </IonCard>
        </div>
    );

    const renderEngineerView = () => (
        <div className="view-container engineer-view">
            <IonRow>
                <IonCol size="12" sizeMd="8">
                    <IonCard className="analysis-table-card">
                        <IonCardHeader>
                            <IonCardTitle>Engineering Performance Matrix</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <table className="premium-table">
                                <thead>
                                    <tr>
                                        <th>Asset</th>
                                        <th>MTBF (hrs)</th>
                                        <th>MTTR (mins)</th>
                                        <th>Uptime</th>
                                        <th>Health Trend</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allAssets.map(asset => (
                                        <tr key={asset.code}>
                                            <td>{asset.code}</td>
                                            <td>720</td>
                                            <td>45</td>
                                            <td><strong>{asset.uptime}</strong></td>
                                            <td><IonIcon icon={trendingUpOutline} color={asset.health > 70 ? 'success' : 'danger'} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="4">
                    <IonCard className="info-card">
                        <IonCardHeader>
                            <IonCardTitle>Strategy & Analytics</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className="opt-item highlight">
                                <IonIcon icon={pulseOutline} color="primary" />
                                <div>
                                    <h6>Predictive Candidates</h6>
                                    <p>MOT-01 and SPEC-X1 show patterns suitable for vibration-based predictive modeling.</p>
                                </div>
                            </div>
                            <div className="opt-item warning">
                                <IonIcon icon={alertCircleOutline} color="warning" />
                                <div>
                                    <h6>Replacement Ranking</h6>
                                    <p>SPEC-X1 has moved to #1 on the capital replacement list due to high MTTR.</p>
                                </div>
                            </div>
                            <div className="opt-item">
                                <IonIcon icon={cashOutline} color="success" />
                                <div>
                                    <h6>Cost Optimization</h6>
                                    <p>Standardizing mechanical belts across CNC section could reduce costs by 12%.</p>
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
                    <IonTitle>Master Asset Dashboard</IonTitle>
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
                            placeholder="Universal Search Assets/Tags..."
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

export default MasterAnalysisView;
