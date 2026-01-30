import React, { useState, useEffect } from 'react';
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonIcon,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonChip,
    IonLabel,
    IonInput,
    IonTextarea,
    IonAvatar,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCheckbox,
    IonTabBar,
    IonTabButton,
    IonSelect,
    IonSelectOption,
    IonFooter,
} from '@ionic/react';
import CommonSelect from '../../../components/CommonSelect';
import CommonButton from '../../../components/CommonButton';
import { closeOutline, earOutline, eyeOutline, handLeftOutline, informationCircleOutline, listCircle } from 'ionicons/icons';
import { fetchAssets, createTask } from '../../../api/task';
import { useToast } from '../../../contexts/ToastContext';
import './style.scss';
import CommonIonicInput from '../../../components/IonicInput';
import { useLoading } from '../../../contexts/LoadingContext';

export const getActionIcon = (action: string) => {
    switch (action) {
        case 'eye':
            return <IonIcon className="checklist-icon" icon={eyeOutline} />;
        case 'hand':
            return <IonIcon className="checklist-icon" icon={handLeftOutline} />;
        case 'ear':
            return <IonIcon className="checklist-icon" icon={earOutline} />;
        default:
            return <IonIcon className="checklist-icon" icon={informationCircleOutline} />;
    }
};

const AddWorkOrderModal = ({ isOpen, closeModal }: any) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [estimatedLaborTime, setEstimatedLaborTime] = useState('');
    const [createdByRemarks, setCreatedByRemarks] = useState('');
    const [selectedAsset, setSelectedAsset] = useState('');
    const [assets, setAssets] = useState<any[]>([]);
    const { showToast } = useToast();
    const [selectedTab, setSelectedTab] = useState<'predefined' | 'custom'>('predefined');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [checklists, setChecklists] = useState<any[]>([]);
    const [selectedChecklists, setSelectedChecklists] = useState<any[]>([]);

    const handleChecklistSelection = (id: string, isSelected: boolean) => {
        if (isSelected) {
            setSelectedChecklists([...selectedChecklists, id]);
        } else {
            setSelectedChecklists(selectedChecklists.filter((checklistId) => checklistId !== id));
        }
    };

    const filteredChecklists = selectedTab === 'predefined'
        ? checklists.filter((c) => c.category === selectedCategory)
        : checklists;
    const { showLoading, hideLoading } = useLoading();
    
    useEffect(() => {
        fetchAssetsList();
    }, []);

    const fetchAssetsList = async () => {
        try {
            const response = await fetchAssets();
            setAssets(response.assets || []);
        } catch (error) {
            console.error('Failed to fetch assets:', error);
            showToast('Failed to load assets. Please try again.', 'danger');
        }
    };

    const handleAssetSelection = (assetId: string) => {
        setSelectedAsset(assetId);
        const asset = assets.find((a) => a.id === assetId);
        setChecklists(asset?.checklists || []);
        setSelectedCategory(''); // Reset selected category
    };

    // Reset checklists when switching tabs
    useEffect(() => {
        setSelectedChecklists([]); // Clear selected checklists
        if (selectedTab === 'custom') {
            setSelectedCategory(''); // Clear selected category for custom
        }
    }, [selectedTab]);

    const handleCreateWorkOrder = async () => {
        if (!title || !description || !priority || !dueDate || !estimatedLaborTime || !createdByRemarks || !selectedAsset || selectedChecklists.length === 0) {
            showToast('Please fill all required fields and select checklists', 'danger');
            return;
        }
        const payload = {
            title,
            description,
            dueDate,
            estimatedLaborTime,
            createdByRemarks,
            asset: selectedAsset,
            checklists: selectedChecklists.map((id: string) => ({ id })),
        };

        try {
            showLoading();
            await createTask(payload);
            showToast('Created Work order successfully!', 'success');
            closeModal();
            hideLoading();
        } catch (error) {
            console.error('Failed to create work order:', error);
            hideLoading();
            showToast('Failed to create work order. Please try again.', 'danger');
        }
    };

    const priorityColors: { [key: string]: string } = {
        low: 'success',
        medium: 'warning',
        high: 'danger',
    };

    const onHandleCategory = (category: any) => {
        setSelectedCategory(category);
        const filteredChecklists = checklists.filter((c) => c.category === category).map((item) => item.id);
        setSelectedChecklists(filteredChecklists);
    }

    return (
        <IonModal isOpen={isOpen} className='add-work-order-container'>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Create Work Order</IonTitle>
                    <IonButtons slot="end">
                        <IonIcon className="close-icon" onClick={closeModal} icon={closeOutline} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <CommonIonicInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12">
                            <CommonIonicInput label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6">
                            <CommonSelect
                                label="Priority"
                                placeholder="Select Priority"
                                value={priority}
                                options={[
                                    { label: 'Low', value: 'low' },
                                    { label: 'Medium', value: 'medium' },
                                    { label: 'High', value: 'high' },
                                ]}
                                onChange={(e) => setPriority(e.detail.value)}
                            />
                        </IonCol>
                        <IonCol size="6">
                            {priority && (
                                <IonChip color={priorityColors[priority]}>
                                    <IonLabel>{priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</IonLabel>
                                </IonChip>
                            )}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="7">
                            <CommonIonicInput
                                label="Estimated Labor Time"
                                value={estimatedLaborTime}
                                onChange={(e) => setEstimatedLaborTime(e.target.value)}
                                placeholder="e.g., 2 hours"
                            />
                        </IonCol>
                        <IonCol size="5">
                            <CommonIonicInput label="Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12">
                            <CommonIonicInput
                                label="Remarks"
                                value={createdByRemarks}
                                onChange={(e) => setCreatedByRemarks(e.target.value)}
                                placeholder="Enter remarks"
                            />
                        </IonCol>
                    </IonRow>
                    <hr />
                    <IonRow>
                        <IonCol size="12">
                            <CommonSelect
                                label="Asset"
                                placeholder="Select Asset"
                                value={selectedAsset}
                                options={assets.map((asset) => ({ label: asset.title, value: asset.id }))}
                                onChange={(e) => handleAssetSelection(e.detail.value)}
                            />
                        </IonCol>
                    </IonRow>
                    {selectedAsset && <IonGrid>
                        <IonLabel className="checklist-label">
                            <strong>Checklist</strong>
                        </IonLabel>
                        <IonTabBar selectedTab={selectedTab}>
                            <IonTabButton
                                tab="predefined"
                                onClick={() => setSelectedTab('predefined')}
                                style={{ borderBottom: selectedTab === 'predefined' ? '2px solid #3880ff' : 'none' }}
                            >
                                <IonLabel>Predefined</IonLabel>
                            </IonTabButton>
                            <IonTabButton
                                tab="custom"
                                onClick={() => setSelectedTab('custom')}
                                style={{ borderBottom: selectedTab === 'custom' ? '2px solid #3880ff' : 'none' }}
                            >
                                <IonLabel>Custom</IonLabel>
                            </IonTabButton>
                        </IonTabBar>

                        {selectedTab === 'predefined' && (
                            <>
                                <IonRow>
                                    {[...new Set(checklists.map((c) => c.category))].map((category) => (
                                        <IonChip
                                            outline
                                            className="selected-chip"
                                            color={selectedCategory === category ? 'primary' : ''}
                                            onClick={() => onHandleCategory(category)}
                                            key={category}
                                        >
                                            <IonIcon icon={listCircle}></IonIcon>
                                            <IonLabel>{category.charAt(0).toUpperCase() + category.slice(1)}</IonLabel>
                                        </IonChip>
                                    ))}
                                </IonRow>
                                <IonRow>
                                    {filteredChecklists.map((checklist) => (
                                        <IonCol size="12" key={checklist.id}>
                                            <IonCard className="checklist-card">
                                                <IonCardHeader className="checklist-card-header">
                                                    {getActionIcon(checklist.option?.type)}
                                                    <IonLabel className='checklist-title-label'>{checklist.question}</IonLabel>
                                                </IonCardHeader>
                                                <IonCardContent>
                                                    <IonRow>
                                                        <IonCol size="2">
                                                            <IonCheckbox checked={true} />
                                                        </IonCol>
                                                        <IonCol size="8">
                                                            <p className="checklist-description">{checklist.description}</p>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonCol>
                                    ))}
                                </IonRow>
                            </>
                        )}

                        {selectedTab === 'custom' && (
                            <IonRow>
                                {checklists.map((checklist) => (
                                    <IonCol size="12" key={checklist.id}>
                                        <IonCard className="checklist-card">
                                            <IonCardHeader className="checklist-card-header">
                                                {getActionIcon(checklist.option?.type)}
                                                <IonLabel className='checklist-title-label'>{checklist.question}</IonLabel>
                                            </IonCardHeader>
                                            <IonCardContent>
                                                <IonRow>
                                                    <IonCol size="2">
                                                        <IonCheckbox
                                                            checked={selectedChecklists.includes(checklist.id)}
                                                            onIonChange={(e) =>
                                                                handleChecklistSelection(checklist.id, e.detail.checked)
                                                            }
                                                        />
                                                    </IonCol>
                                                    <IonCol size="8">
                                                        <p>{checklist.description}</p>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                ))}
                            </IonRow>
                        )}
                    </IonGrid>}
                </IonGrid>
            </IonContent>
            <IonFooter>
                <IonRow>
                    <IonCol size="12">
                        <CommonButton onClick={handleCreateWorkOrder} label="Create" rootClass="create-work-order-btn" />
                    </IonCol>
                </IonRow>
            </IonFooter>
        </IonModal>
    );
};

export default AddWorkOrderModal;
