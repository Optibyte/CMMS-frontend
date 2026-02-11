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
    funnelOutline,
    timeOutline,
    alertCircleOutline,
    calendarOutline,
    statsChartOutline,
    constructOutline,
    scanOutline,
    trendingUpOutline,
    barChartOutline,
    leafOutline
} from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import '../OilFluids/style.scss';

const FiltersView: React.FC = () => {
    const userRole = useSelector((state: RootState) => state.user?.role?.name || 'TECHNICIAN');
    const [selectedView, setSelectedView] = useState(userRole.toLowerCase());
    const [searchTerm, setSearchTerm] = useState('');

    const filtersData = [
        {
            id: 'F1',
            machineCode: 'CNC-015',
            name: 'Hydraulic Return Filter',
            type: 'Hydraulic Filter',
            partNum: 'HYD-F-77',
            lastChange: '2025-11-01',
            nextDue: '2026-03-01',
            status: 'good',
            diffPressure: '1.2 bar',
            location: 'Main Tank - Right Side'
        },
        {
            id: 'F2',
            machineCode: 'FAN-09',
            name: 'Air Intake Filter',
            type: 'Air Filter',
            partNum: 'AIR-992-G',
            lastChange: '2025-08-15',
            nextDue: '2026-02-05', // Overdue
            status: 'overdue',
            diffPressure: '4.8 bar (High)',
            location: 'Motor Housing'
        }
    ];

    const renderTechnicianView = () => (
        <div className="view-container technician-view">
            <IonRow>
                {filtersData.map(filter => (
                    <IonCol size="12" sizeMd="6" sizeLg="4" key={filter.id}>
                        <IonCard className={`premium-card ${filter.status}`}>
                            <IonCardHeader>
                                <div className="header-top">
                                    <IonBadge color={filter.status === 'overdue' ? 'danger' : 'success'}>{filter.status.toUpperCase()}</IonBadge>
                                    <span className="machine-code">{filter.machineCode}</span>
                                </div>
                                <IonCardTitle>{filter.name}</IonCardTitle>
                                <p className="oil-type">{filter.partNum} | {filter.type}</p>
                            </IonCardHeader>
                            <IonCardContent>
                                <div className="data-grid">
                                    <div className="data-item"><IonIcon icon={timeOutline} /><span>Diff Pressure: <strong>{filter.diffPressure}</strong></span></div>
                                    <div className="data-item"><IonIcon icon={calendarOutline} /><span>Next Due: <strong>{filter.nextDue}</strong></span></div>
                                    <div className="data-item"><IonIcon icon={funnelOutline} /><span>Location: {filter.location}</span></div>
                                </div>
                                <div className="actions">
                                    <IonButton fill="clear" color="primary"><IonIcon slot="start" icon={scanOutline} />Record Change</IonButton>
                                    <IonButton fill="clear" color="secondary">Procedure</IonButton>
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
                            <IonIcon icon={barChartOutline} className="stat-icon" />
                            <h3>Monthly Filter Consumption</h3>
                            <h2>124 <small>Filters</small></h2>
                            <p>Cost: $4,200/mo</p>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="4">
                    <IonCard className="stats-card gradient-2">
                        <IonCardContent>
                            <IonIcon icon={alertCircleOutline} className="stat-icon" />
                            <h3>PM Compliance (Filters)</h3>
                            <h2>88%</h2>
                            <p>14 machines overdue</p>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="4">
                    <IonCard className="stats-card gradient-3">
                        <IonCardContent>
                            <IonIcon icon={leafOutline} className="stat-icon" />
                            <h3>Washable Opportunity</h3>
                            <h2>15% <small>Potential</small></h2>
                            <p>Projected savings: $800/mo</p>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>

            <h2 className="section-title">Consumable Procurement Trend</h2>
            <IonCard className="analysis-table-card">
                <IonCardContent>
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>Filter Type</th>
                                <th>Usage (Last 30d)</th>
                                <th>Stock Level</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Hydraulic Filter (HYD-F-77)</td>
                                <td>12</td>
                                <td>45</td>
                                <td><IonBadge color="success">OK</IonBadge></td>
                            </tr>
                            <tr>
                                <td>Air Intake (AIR-992-G)</td>
                                <td>42</td>
                                <td>8</td>
                                <td><IonBadge color="danger">REORDER</IonBadge></td>
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
                    <IonCardTitle>Filter Performance & Life Analysis</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>Machine</th>
                                <th>Actual Life</th>
                                <th>Expected Life</th>
                                <th>Efficiency Grade</th>
                                <th>Contamination Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>CNC-015</td>
                                <td>1,800 hrs</td>
                                <td>2,000 hrs</td>
                                <td><span className="status-pill good">Grade A</span></td>
                                <td>Ambient Dust</td>
                            </tr>
                            <tr>
                                <td>FAN-09</td>
                                <td>800 hrs</td>
                                <td>1,500 hrs</td>
                                <td><span className="status-pill bad">Grade C</span></td>
                                <td>Process Byproduct</td>
                            </tr>
                        </tbody>
                    </table>
                </IonCardContent>
            </IonCard>

            <IonRow>
                <IonCol size="12">
                    <IonCard className="info-card">
                        <IonCardHeader>
                            <IonCardTitle>Engineering Recommendations</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className="opt-item warning">
                                <IonIcon icon={alertCircleOutline} color="warning" />
                                <div>
                                    <h6>Frequent Clogging - FAN-09</h6>
                                    <p>Air intake filter is saturating 40% faster than design specs. Env analysis required.</p>
                                </div>
                            </div>
                            <div className="opt-item highlight">
                                <IonIcon icon={trendingUpOutline} color="primary" />
                                <div>
                                    <h6>HEPA Upgrade - Clean Room Units</h6>
                                    <p>Switching to higher efficiency media will protect downstream sensitive components.</p>
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
                    <IonTitle>Filters & Consumables</IonTitle>
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
                            placeholder="Search Filter Type or Machine..."
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

export default FiltersView;
