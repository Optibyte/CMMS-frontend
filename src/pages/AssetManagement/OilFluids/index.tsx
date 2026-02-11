import React, { useState, useEffect } from 'react';
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
    IonAvatar,
    IonModal,
    IonItem,
    IonInput,
    IonDatetime,
    IonList,
} from '@ionic/react';
import {
    waterOutline,
    flaskOutline,
    alertCircleOutline,
    calendarOutline,
    locationOutline,
    constructOutline,
    trendingUpOutline,
    statsChartOutline,
    cashOutline,
    shieldCheckmarkOutline,
    scanOutline,
    addOutline,
    closeOutline,
    createOutline,
    searchOutline
} from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { createAsset, fetchAssets, updateAsset } from '../../../api/task';
import { useToast } from '../../../contexts/ToastContext';
import './style.scss';

const OilFluidsView: React.FC = () => {
    const userRole = useSelector((state: RootState) => state.user?.role?.name || 'TECHNICIAN');
    const [selectedView, setSelectedView] = useState('technician');
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (userRole && typeof userRole === 'string') {
            const role = userRole.toLowerCase();
            if (['technician', 'hod', 'engineer'].includes(role)) {
                setSelectedView(role);
            } else {
                setSelectedView('technician'); // Default for Admin or others
            }
        }
    }, [userRole]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editAssetId, setEditAssetId] = useState<string | null>(null);

    const { showToast } = useToast();

    // Form State
    const [formData, setFormData] = useState({
        machineCode: '',
        machineName: '',
        level: '',
        nextDue: '',
        storage: '',
        stock: ''
    });

    // State for Oil Assets
    const [assets, setAssets] = useState<any[]>([
        {
            id: 'mock-1',
            machineCode: 'CNC-001',
            machineName: 'VMC 3-Axis',
            oilType: 'Engine Oil 10W-30',
            currentLevel: '75%',
            quantityRemaining: 15,
            lastChange: '2025-12-15',
            nextDue: '2026-02-10',
            consumptionRate: '0.5 L/hr',
            location: 'Main Bay - Shelf A',
            procedure: '1. Drain old oil... 2. Replace filter... 3. Fill new oil.',
            status: 'warning',
            costPerMonth: 150,
            analysis: { contamination: 'Low', viscosity: 'Normal' }
        },
        {
            id: 'mock-2',
            machineCode: 'HYD-042',
            machineName: 'Hydraulic Press',
            oilType: 'Hydraulic Oil ISO 46',
            currentLevel: '20%',
            quantityRemaining: 40,
            lastChange: '2025-10-01',
            nextDue: '2026-01-20',
            consumptionRate: '1.2 L/hr',
            location: 'Storage B - Row 4',
            procedure: 'Refer to Manual HYD-042 Section 5.',
            status: 'overdue',
            costPerMonth: 450,
            analysis: { contamination: 'High - Metal Particles Detected', viscosity: 'Degraded' }
        },
        {
            id: 'mock-3',
            machineCode: 'L-88',
            machineName: 'Heavy Lathe',
            oilType: 'Gear Oil 80W-90',
            currentLevel: '90%',
            quantityRemaining: 5,
            lastChange: '2026-01-10',
            nextDue: '2026-05-10',
            consumptionRate: '0.1 L/hr',
            location: 'Machine Side - Oil Tank',
            procedure: 'Easy Fill - Side Port.',
            status: 'good',
            costPerMonth: 50,
            analysis: { contamination: 'Clean', viscosity: 'Optimal' }
        }
    ]);

    const [inventoryStatus] = useState([
        { type: 'Engine Oil 10W-30', stock: 500, min: 100, unit: 'L' },
        { type: 'Hydraulic Oil ISO 46', stock: 50, min: 200, unit: 'L' },
        { type: 'Gear Oil 80W-90', stock: 200, min: 50, unit: 'L' }
    ]);

    useEffect(() => {
        loadAssets();
    }, []);

    const loadAssets = async () => {
        try {
            const response = await fetchAssets();
            const rawAssets = Array.isArray(response?.assets) ? response.assets : [];
            const apiAssets = rawAssets.filter((a: any) => a && a.category === 'OIL_FLUIDS').map((a: any) => ({
                id: a.id,
                machineCode: a.code || '',
                machineName: a.title || 'Unknown Machine',
                oilType: 'Standard Fluid',
                currentLevel: a.metadata?.level || '0%',
                quantityRemaining: a.metadata?.stock || 0,
                lastChange: typeof a.createdAt === 'string' ? a.createdAt.split('T')[0] : 'N/A',
                nextDue: a.metadata?.nextDue || 'N/A',
                consumptionRate: '0.0 L/hr',
                location: typeof a.location === 'object' ? (a.location?.name || 'N/A') : (a.location || 'N/A'),
                procedure: 'N/A',
                status: 'good',
                costPerMonth: 0,
                analysis: { contamination: 'Pending', viscosity: 'N/A' }
            }));

            setAssets(prev => {
                const apiMap = new Map(apiAssets.map((asset: any) => [asset.id, asset]));
                const filteredMock = prev.filter(asset => asset.id.startsWith('mock-'));
                return [...apiAssets, ...filteredMock];
            });
        } catch (error) {
            console.error('Fetch assets error:', error);
        }
    };

    const handleEditAsset = (asset: any) => {
        setIsEditing(true);
        setEditAssetId(asset.id);
        setFormData({
            machineCode: asset.machineCode || '',
            machineName: asset.machineName || '',
            level: String(asset.currentLevel || '').replace('%', ''),
            nextDue: asset.nextDue || '',
            storage: asset.location || '',
            stock: asset.quantityRemaining || ''
        });
        setShowAddModal(true);
    };

    const handleAddRecord = async () => {
        const payload = {
            title: formData.machineName || (formData.machineCode ? `Machine ${formData.machineCode}` : 'New Machine'),
            category: 'OIL_FLUIDS',
            code: formData.machineCode || null,
            location: { name: formData.storage },
            metadata: {
                level: formData.level + '%',
                nextDue: formData.nextDue,
                stock: formData.stock
            },
            photos: []
        };

        try {
            const isRealAsset = editAssetId && !editAssetId.startsWith('mock-');

            if (isEditing && isRealAsset) {
                await updateAsset(editAssetId!, payload);
                showToast('Record updated successfully!', 'success');
            } else {
                await createAsset(payload);
                showToast('Record saved successfully!', 'success');
            }

            setShowAddModal(false);
            setIsEditing(false);
            setEditAssetId(null);
            setFormData({ machineCode: '', machineName: '', level: '', nextDue: '', storage: '', stock: '' });
            await loadAssets();
        } catch (error: any) {
            console.error('Save error:', error);
            const errMsg = error?.response?.data?.message || 'Failed to save record';
            showToast(errMsg, 'danger');
        }
    };

    const handleSearch = () => {
        setSearchTerm(searchInput);
    };

    const filteredAssets = (assets || []).filter(asset => {
        if (!asset) return false;
        const query = (searchTerm || '').toLowerCase();
        if (!query) return true;
        return (
            String(asset.machineCode || '').toLowerCase().includes(query) ||
            String(asset.machineName || '').toLowerCase().includes(query) ||
            String(asset.oilType || '').toLowerCase().includes(query) ||
            String(asset.location || '').toLowerCase().includes(query)
        );
    }).sort((a, b) => {
        const query = (searchTerm || '').toLowerCase();
        if (!query) return 0;

        const aCode = String(a.machineCode || '').toLowerCase();
        const bCode = String(b.machineCode || '').toLowerCase();

        // Priority 1: Exact match on code
        if (aCode === query && bCode !== query) return -1;
        if (bCode === query && aCode !== query) return 1;

        // Priority 2: Starts with query on code (Suggestions)
        const aStarts = aCode.startsWith(query);
        const bStarts = bCode.startsWith(query);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        return 0;
    });

    const renderTechnicianView = () => (
        <div className="view-container technician-view">
            <IonRow>
                {filteredAssets.map((asset: any) => (
                    <IonCol size="12" sizeMd="6" sizeLg="4" key={asset.id}>
                        <IonCard className={`premium-card ${asset.status}`}>
                            <div className="card-glass-overlay"></div>
                            <IonCardHeader>
                                <div className="header-top">
                                    <IonBadge color={asset.status === 'overdue' ? 'danger' : asset.status === 'warning' ? 'warning' : 'success'}>
                                        {(asset.status || 'good').toUpperCase()}
                                    </IonBadge>
                                    <span className="machine-code">{asset.machineCode || 'Unassigned'}</span>
                                </div>
                                <IonCardTitle>{asset.machineName}</IonCardTitle>
                                <p className="oil-type">{asset.oilType}</p>
                            </IonCardHeader>
                            <IonCardContent>
                                <div className="data-grid">
                                    <div className="data-item">
                                        <IonIcon icon={waterOutline} />
                                        <span>Level: <strong>{asset.currentLevel || '0%'}{String(asset.currentLevel || '').includes('%') ? '' : '%'}</strong></span>
                                    </div>
                                    <div className="data-item">
                                        <IonIcon icon={calendarOutline} />
                                        <span>Next Due: <strong>{asset.nextDue}</strong></span>
                                    </div>
                                    <div className="data-item">
                                        <IonIcon icon={flaskOutline} />
                                        <span>Stock: <strong>{asset.quantityRemaining} L</strong></span>
                                    </div>
                                    <div className="data-item">
                                        <IonIcon icon={locationOutline} />
                                        <span>Storage: {asset.location}</span>
                                    </div>
                                </div>
                                <div className="actions">
                                    <IonButton fill="clear" className="scan-btn" onClick={() => handleEditAsset(asset)}>
                                        <IonIcon slot="start" icon={scanOutline} />
                                        Update Oil Change
                                    </IonButton>
                                    <IonButton fill="clear" color="primary" onClick={() => handleEditAsset(asset)}>
                                        <IonIcon slot="icon-only" icon={createOutline} />
                                    </IonButton>
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
            <IonGrid>
                <IonRow>
                    <IonCol size="12" sizeMd="4">
                        <IonCard className="stats-card gradient-1">
                            <IonCardContent>
                                <IonIcon icon={statsChartOutline} className="stat-icon" />
                                <h3>Total Monthly Consumption</h3>
                                <h2>1,240 <small>Liters</small></h2>
                                <p>+12% from last month</p>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    <IonCol size="12" sizeMd="4">
                        <IonCard className="stats-card gradient-2">
                            <IonCardContent>
                                <IonIcon icon={cashOutline} className="stat-icon" />
                                <h3>Total Oil Budget</h3>
                                <h2>$12,500 <small>/ $15,000</small></h2>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: '83%' }}></div>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    <IonCol size="12" sizeMd="4">
                        <IonCard className="stats-card gradient-3">
                            <IonCardContent>
                                <IonIcon icon={alertCircleOutline} className="stat-icon" />
                                <h3>Overdue Assets</h3>
                                <h2>12 <small>Machines</small></h2>
                                <IonChip color="danger">Immediate Action</IonChip>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>

                <h2 className="section-title">Inventory Status</h2>
                <IonRow>
                    {inventoryStatus.map((item, idx) => (
                        <IonCol size="12" sizeMd="4" key={idx}>
                            <IonCard className="inventory-card">
                                <IonCardContent>
                                    <div className="inv-header">
                                        <h4>{item.type}</h4>
                                        {item.stock < item.min && <IonBadge color="danger">REORDER</IonBadge>}
                                    </div>
                                    <div className="inv-body">
                                        <div className="stock-level">
                                            <span><strong>{item.stock}</strong> {item.unit}</span>
                                            <small>Min Level: {item.min} {item.unit}</small>
                                        </div>
                                    </div>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>
        </div>
    );

    const renderEngineerView = () => (
        <div className="view-container engineer-view">
            <IonRow>
                <IonCol size="12">
                    <IonCard className="analysis-table-card">
                        <IonCardHeader>
                            <IonCardTitle>Engineering Analysis - Oil Health & Efficiency</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className="table-wrapper">
                                <table className="premium-table">
                                    <thead>
                                        <tr>
                                            <th>Machine</th>
                                            <th>Oil Spec</th>
                                            <th>Contamination</th>
                                            <th>Viscosity</th>
                                            <th>Level</th>
                                            <th>Cost/Hour</th>
                                            <th>Optimization</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAssets.map((asset: any) => (
                                            <tr key={asset.id}>
                                                <td>{asset.machineCode || 'Unassigned'}</td>
                                                <td>{asset.oilType}</td>
                                                <td>
                                                    <span className={`status-pill ${String(asset.analysis?.contamination || '').includes('High') ? 'bad' : 'good'}`}>
                                                        {asset.analysis?.contamination || 'Pending'}
                                                    </span>
                                                </td>
                                                <td>{asset.analysis?.viscosity}</td>
                                                <td>{asset.currentLevel || '0%'}{String(asset.currentLevel || '').includes('%') ? '' : '%'}</td>
                                                <td>${((asset.costPerMonth || 0) / 160).toFixed(2)}</td>
                                                <td>
                                                    <IonButton size="small" fill="outline" onClick={() => handleEditAsset(asset)}>
                                                        Edit
                                                    </IonButton>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol size="12" sizeMd="6">
                    <IonCard className="info-card">
                        <IonCardHeader>
                            <IonCardTitle>Optimization Opportunities</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className="opt-item">
                                <IonIcon icon={trendingUpOutline} color="success" />
                                <div>
                                    <h6>Extend Interval: VMC CNC-001</h6>
                                    <p>Low contamination levels suggest we can extend change interval by 15%.</p>
                                </div>
                            </div>
                            <div className="opt-item warning">
                                <IonIcon icon={alertCircleOutline} color="warning" />
                                <div>
                                    <h6>Excessive Consumption: HYD-042</h6>
                                    <p>Consumption rate is 50% higher than similar units. Check for leaks.</p>
                                </div>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                    <IonCard className="info-card">
                        <IonCardHeader>
                            <IonCardTitle>Upgrade Recommendations</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className="opt-item highlight">
                                <IonIcon icon={shieldCheckmarkOutline} color="primary" />
                                <div>
                                    <h6>Switch to Synthetic - All Lathes</h6>
                                    <p>Projected 20% reduction in wear and 2x longer oil life.</p>
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
                    <IonTitle>Oil & Fluids Management</IonTitle>
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
                            placeholder="Search Machine Code or Oil Type..."
                            value={searchInput}
                            onIonChange={e => setSearchInput(e.detail.value || '')}
                            onIonClear={() => { setSearchInput(''); setSearchTerm(''); }}
                            onKeyPress={e => { if (e.key === 'Enter') handleSearch(); }}
                            className="premium-search"
                            searchIcon="search-outline"
                        />
                        <IonButton fill="solid" color="primary" onClick={handleSearch} style={{ marginLeft: '8px' }}>
                            <IonIcon slot="icon-only" icon={scanOutline} />
                        </IonButton>
                        <IonButton fill="solid" color="primary" className="add-record-btn" onClick={() => { setIsEditing(false); setFormData({ machineCode: '', machineName: '', level: '', nextDue: '', storage: '', stock: '' }); setShowAddModal(true); }}>
                            <IonIcon slot="start" icon={addOutline} />
                            Add New
                        </IonButton>
                    </div>

                    <IonModal isOpen={showAddModal} onDidDismiss={() => setShowAddModal(false)} className="premium-modal">
                        <IonHeader>
                            <IonToolbar>
                                <IonTitle>{isEditing ? 'Edit' : 'Add'} Oil Management Record</IonTitle>
                                <IonButtons slot="end">
                                    <IonButton onClick={() => setShowAddModal(false)}>
                                        <IonIcon icon={closeOutline} />
                                    </IonButton>
                                </IonButtons>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent className="ion-padding">
                            <div className="modal-form">
                                <IonList lines="none">
                                    <div className="input-group">
                                        <IonLabel position="stacked">Machine Code (Optional)</IonLabel>
                                        <IonInput
                                            placeholder="e.g. CNC-099"
                                            value={formData.machineCode}
                                            onIonChange={e => setFormData({ ...formData, machineCode: e.detail.value! })}
                                            className="premium-input"
                                        />
                                    </div>

                                    <div className="input-group">
                                        <IonLabel position="stacked">Machine Name</IonLabel>
                                        <IonInput
                                            placeholder="e.g. VMC 3-Axis"
                                            value={formData.machineName}
                                            onIonChange={e => setFormData({ ...formData, machineName: e.detail.value! })}
                                            className="premium-input"
                                        />
                                    </div>

                                    <div className="input-group">
                                        <IonLabel position="stacked">Oil Level (%)</IonLabel>
                                        <IonInput
                                            type="number"
                                            placeholder="e.g. 85"
                                            value={formData.level}
                                            onIonChange={e => setFormData({ ...formData, level: e.detail.value! })}
                                            className="premium-input"
                                        />
                                    </div>

                                    <div className="input-group">
                                        <IonLabel position="stacked">Stock/Quantity (L)</IonLabel>
                                        <IonInput
                                            type="number"
                                            placeholder="e.g. 50"
                                            value={formData.stock}
                                            onIonChange={e => setFormData({ ...formData, stock: e.detail.value! })}
                                            className="premium-input"
                                        />
                                    </div>

                                    <div className="input-group">
                                        <IonLabel position="stacked">Next Due Date</IonLabel>
                                        <IonInput
                                            type="date"
                                            value={formData.nextDue}
                                            onIonChange={e => setFormData({ ...formData, nextDue: e.detail.value! })}
                                            className="premium-input"
                                        />
                                    </div>

                                    <div className="input-group">
                                        <IonLabel position="stacked">Storage Location</IonLabel>
                                        <IonInput
                                            placeholder="e.g. Shelf C - Bay 2"
                                            value={formData.storage}
                                            onIonChange={e => setFormData({ ...formData, storage: e.detail.value! })}
                                            className="premium-input"
                                        />
                                    </div>
                                </IonList>

                                <div className="modal-footer">
                                    <IonButton expand="block" onClick={handleAddRecord} className="save-btn">
                                        {isEditing ? 'Update' : 'Save'} Record
                                    </IonButton>
                                </div>
                            </div>
                        </IonContent>
                    </IonModal>

                    {selectedView === 'technician' && renderTechnicianView()}
                    {selectedView === 'hod' && renderHODView()}
                    {selectedView === 'engineer' && renderEngineerView()}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default OilFluidsView;
