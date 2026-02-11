import React, { useState } from 'react';
import {
    IonItem,
    IonLabel,
    IonCheckbox,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonText,
    IonIcon,
    IonAccordion,
    IonAccordionGroup,
    IonRow,
    IonCol,
    IonModal,
    IonButton,
    IonImg,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonContent,
    IonInput,
} from '@ionic/react';
import {
    checkmarkCircleOutline,
    alertCircleOutline,
    createOutline,
    checkmarkDoneOutline,
    eyeOutline,
    imagesOutline,
} from 'ionicons/icons';
import './style.scss';
import UploadImages from '../UploadImages';
import { STATUS } from '../../constants/status';

export const getActionIcon = (action: string) => {
    switch (action) {
        case 'eye':
            return <IonIcon icon={eyeOutline} />;
        default:
            return null;
    }
};

interface ChecklistComponentProps {
    checklists: any[];
    isEditing: boolean;
    readOnly: boolean;
    handleChecklistChange: Function;
    handleCheckboxChange: Function;
    handleCheckListMode: any;
    onUploadImages?: any;
    onRemoveImage?: any;
}

const ChecklistComponent: React.FC<ChecklistComponentProps> = ({
    checklists,
    isEditing,
    handleChecklistChange,
    handleCheckboxChange,
    handleCheckListMode,
    readOnly,
    onUploadImages,
    onRemoveImage
}) => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);


    const handlePreview = (images: string[]) => {
        setSelectedImages(images);
        setIsPreviewOpen(true);
    };

    const closePreview = () => {
        setIsPreviewOpen(false);
    };

    // Check if all fields are valid
    const isFieldInvalid = (item: any) => {
        const isStatusInvalid = !item.status;
        const isRemarksInvalid = item.remarks.trim() === '';
        const isImagesInvalid = !item.uploadedImages || item.uploadedImages.length === 0;
        return isStatusInvalid || isRemarksInvalid || isImagesInvalid;
    };

    // Determine the combined error message
    const getCombinedErrorMessage = (item: any) => {
        const errors = [];
        if (!item.status) errors.push('Status is required');
        if (item.remarks.trim() === '') errors.push('Remarks are required');
        if (!item.uploadedImages || item.uploadedImages.length === 0) errors.push('At least one image is required');
        return errors.join('. ');
    };

    const hanldeChecklistSave = () => {
        const hasValidationIssues = checklists.some((item) => isFieldInvalid(item));
        console.log('hasValidationIssues', hasValidationIssues);

        if (!hasValidationIssues || !isEditing) {
            handleCheckListMode();
        }
    };

    return (
        <div className="checklist-section">
            <IonRow>
                <IonCol size="10">
                    <IonText className="checklist-title">Checklist</IonText>
                </IonCol>
                <IonCol size="2" className="checklist-edit-btn">
                    <IonIcon
                        icon={isEditing ? checkmarkDoneOutline : createOutline}
                        onClick={hanldeChecklistSave}
                        className={`edit-checklist-icon ${readOnly ? 'disabled' : ''}`}
                    />
                </IonCol>
            </IonRow>
            <IonAccordionGroup>
                {checklists?.map((item, index) => (
                    <IonAccordion className='accordion-container' key={index}>
                        <IonItem slot="header" className="checklist-item-header">
                            <IonLabel className="checklist-item-title">
                                <span>{item.question}</span>
                            </IonLabel>
                            <IonIcon
                                icon={isFieldInvalid(item) ? alertCircleOutline : checkmarkCircleOutline}
                                className="status-icon"
                                color={isFieldInvalid(item) ? 'danger' : 'success'}
                            />
                        </IonItem>
                        <IonItem slot="content">
                            <IonCard className="checklist-item-card">
                                <IonCardHeader>
                                    <IonLabel>
                                        <strong>Task:&nbsp;</strong> {item.question}
                                    </IonLabel>
                                    <IonLabel>
                                        <strong>How to Check:&nbsp;</strong> {getActionIcon(item.option?.type)}{' '}
                                        {item.description}
                                    </IonLabel>
                                </IonCardHeader>
                                <IonCardContent className="checklist-item-content">
                                    <IonLabel className="status-label">
                                        <strong>Status:&nbsp;</strong>
                                        {isEditing ? (
                                            <span>
                                                <IonCheckbox
                                                    // checked={item.status?.value === STATUS.COMPLETED}
                                                    onIonChange={(e) => handleCheckboxChange(e, index)}
                                                />
                                            </span>
                                        ) : (
                                            <span className={`status ${item.status?.value === STATUS.COMPLETED ? 'completed' : 'pending'}`}>
                                                {item.status?.value === STATUS.COMPLETED ? 'Checked' : 'Not Checked'}
                                            </span>
                                        )}
                                    </IonLabel>
                                    <IonLabel>
                                        <strong>Remarks:&nbsp;</strong>
                                    </IonLabel>
                                    {isEditing ? (
                                        <IonInput
                                            value={item.remarks}
                                            onIonChange={(e) => handleChecklistChange(e, index, 'remarks')}
                                            placeholder="Enter remarks"
                                            className="remarks-input"
                                            type="text"
                                        />
                                    ) : (
                                        <p>{item.remarks}</p>
                                    )}
                                    <div className="image-upload-section">
                                        <UploadImages
                                            uploadedImages={item.uploadedImages || []}
                                            isEditing={isEditing}
                                            onUploadImages={(files) => onUploadImages(files, index)}
                                            onRemoveImage={(imageUrl) => onRemoveImage(imageUrl, index)}
                                        />
                                    </div>
                                    {(isFieldInvalid(item) && isEditing) && (
                                        <IonText color="danger" className="error-message">
                                            {getCombinedErrorMessage(item)}
                                        </IonText>
                                    )}
                                </IonCardContent>
                            </IonCard>
                        </IonItem>
                    </IonAccordion>
                ))}
            </IonAccordionGroup>

            {/* Image Preview Modal */}
            <IonModal isOpen={isPreviewOpen} onDidDismiss={closePreview}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Image Preview</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={closePreview}>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="image-preview-grid">
                        {selectedImages.map((image, idx) => (
                            <IonImg key={idx} src={image} className="preview-image" />
                        ))}
                    </div>
                </IonContent>
            </IonModal>
        </div>
    );
};

export default ChecklistComponent;