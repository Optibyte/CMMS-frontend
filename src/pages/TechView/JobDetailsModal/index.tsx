import React, { useState } from 'react';
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardContent, IonLabel, IonText, IonRow, IonCol, IonInput, IonCheckbox, IonItem, IonCardTitle, IonIcon, IonTextarea, IonToggle, IonGrid } from '@ionic/react';
import './style.scss';
import ChecklistComponent from '../../../components/JobCheckList';
import { closeOutline, locationOutline, qrCodeOutline } from 'ionicons/icons';
import { updateTask, uploadTaskImage, deleteTaskImage } from '../../../api/task';
import { updateMultipleChecklists } from '../../../api/checklist';
import { useToast } from '../../../contexts/ToastContext';
import machine1 from '../../../assets/machine_1.png';
import machine2 from '../../../assets/machine_2.png';
import machine3 from '../../../assets/machine_3.png';
import VerificationOptions from '../../../components/VerificationOptions';
import { useLoading } from '../../../contexts/LoadingContext';
import CommonButton from '../../../components/CommonButton';
import { STATUS } from '../../../constants/status';

const uploadedImages = [
  machine1,
  machine2,
  machine3,
  machine2
];

interface JobDetailsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  jobDetails: any;
  completeJob: Function
};

const TechJobDetailsModal: React.FC<JobDetailsModalProps> = ({ isOpen, closeModal, jobDetails, completeJob }) => {
  const [isEditChecklist, setIsEditChecklist] = useState(false);
  const [editableJobDetails, setEditableJobDetails] = useState(jobDetails);
  const [isQRScanned, setIsQRScanned] = useState(false);
  const [isLocationVerified, setIsLocationVerified] = useState(false);
  const { showToast } = useToast();
  const { showLoading, hideLoading } = useLoading();

  // Handle input change for general job details
  const handleChange = (e: any, field: string) => {
    setEditableJobDetails({
      ...editableJobDetails,
      [field]: e.target.value,
    });
  };

  // Handle checklist item status change
  const handleChecklistChange = (e: any, index: number, field: string) => {
    const updatedChecklist = [...editableJobDetails.checklists];
    updatedChecklist[index][field] = e.target.value;
    setEditableJobDetails({
      ...editableJobDetails,
      checklists: updatedChecklist
    });
  };

  // Handle checklist item checkbox change
  const handleCheckboxChange = (e: any, index: number) => {
    const updatedChecklist = [...editableJobDetails.checklists];
    updatedChecklist[index].status = {
      value: e.target.checked ? STATUS.COMPLETED : STATUS.PENDING
    };
    setEditableJobDetails({
      ...editableJobDetails,
      checklists: updatedChecklist
    });
  };

  const onUploadImages = async (files: FileList | null, index: number) => {
    if (!files) return;

    try {
      showLoading();
      const checklistId = editableJobDetails.checklists[index].id;
      const taskId = editableJobDetails.id;
      const uploadPromises = Array.from(files).map(file => uploadTaskImage(file, checklistId, taskId));
      const results = await Promise.all(uploadPromises);
      const imageUrls = results.map(res => res.url);

      const updatedChecklist = [...editableJobDetails.checklists];
      updatedChecklist[index].uploadedImages = [
        ...(updatedChecklist[index].uploadedImages || []),
        ...imageUrls
      ];

      setEditableJobDetails({
        ...editableJobDetails,
        checklists: updatedChecklist
      });
      showToast('Images uploaded successfully');
    } catch (error) {
      console.error('Failed to upload images:', error);
      showToast('Failed to upload images', 'danger');
    } finally {
      hideLoading();
    }
  }

  const onRemoveImage = async (imageUrl: string, index: number) => {
    try {
      showLoading();
      const checklistId = editableJobDetails.checklists[index].id;
      await deleteTaskImage(imageUrl, checklistId);

      const updatedChecklist = [...editableJobDetails.checklists];
      updatedChecklist[index].uploadedImages = updatedChecklist[index].uploadedImages.filter(
        (url: string) => url !== imageUrl
      );

      setEditableJobDetails({
        ...editableJobDetails,
        checklists: updatedChecklist
      });
      showToast('Image removed successfully');
    } catch (error) {
      console.error('Failed to delete image:', error);
      showToast('Failed to delete image', 'danger');
    } finally {
      hideLoading();
    }
  }

  /**
 * Parse a list of checklists into objects with checklistId and payload for the API
 * @param checklistList - List of checklists to be parsed
 * @returns Parsed list of checklist objects with checklistId and payload
 */
  const parseChecklistsForAPI = (checklistList: any[]) => {
    return checklistList.map((checklist) => ({
      checklistId: checklist.id,
      payload: {
        question: checklist.question,
        questionType: checklist.questionType,
        option: checklist.option || {},
        description: checklist.description,
        status: checklist.status?.value,
        remarks: checklist.remarks || '',
        expectedAnswer: checklist.expectedAnswer,
        photos: checklist.uploadedImages || [],
      },
    }));
  };

  const handleUpdateAllChecklists = async () => {
    try {
      const payload = parseChecklistsForAPI(editableJobDetails.checklists);
      await updateMultipleChecklists(payload, editableJobDetails.id);
      showToast('All checklists updated successfully..!');
    } catch (error) {
      console.error('Failed to update checklists:', error);
      throw error;
    }
  };

  const toggleChecklistMode = () => {
    const editMode = !isEditChecklist;
    setIsEditChecklist(!isEditChecklist);
    if (!editMode) {
      handleUpdateAllChecklists();
    }
  }

  const prepareTaskUpdatePayload = (data: any) => {
    return {
      status: STATUS.SUBMITTED,
      assignedToRemarks: data.assignedToRemarks,
      // checklists: data.checklists.map((item: any) => ({
      //   id: item.id,
      //   status: item.status,
      //   remarks: item.remarks
      // }))
    };
  };

  const onCompleteJob = async () => {
    try {
      showLoading();
      // Ensure all checklist changes are saved
      await handleUpdateAllChecklists();

      const payload = prepareTaskUpdatePayload(editableJobDetails);
      await updateTask(editableJobDetails.id, payload);
      completeJob();
      showToast('Successfully submitted the job..!');
    } catch (error) {
      console.error('Failed to complete job:', error);
      showToast('Failed to submit job', 'danger');
    } finally {
      hideLoading();
    }
  };

  const isChecklistComplete = () => {
    return editableJobDetails?.checklists.every(
      (item: any) => item.status && item.remarks.trim() !== ''
    );
  };

  const handleQRScan = (e: any) => {
    setIsQRScanned(e);
    if (e) {
      showToast('QR Code Scanned Successfully', 'success');
    }
  };

  const handleLocationVerification = (e: any) => {
    setIsLocationVerified(e);
    if (e) {
      showToast('Location Verified Successfully', 'success');
    }
  };

  const isChecklistVisible = isQRScanned && isLocationVerified;

  return (
    <IonModal className='job-modal' isOpen={isOpen} onDidDismiss={closeModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Work Order: {editableJobDetails?.workOrderId}</IonTitle>
          <IonButtons slot="end">
            <IonIcon className="close-icon" onClick={closeModal} icon={closeOutline} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="job-details">
          <IonCardHeader className="job-details-header">
            <IonRow>
              <IonCardTitle className="job-title">
                {
                  editableJobDetails?.title
                }
              </IonCardTitle>
            </IonRow>
            <IonRow>
              <IonText className={`status-text ${editableJobDetails?.jobStatus}`}>
                <span>{editableJobDetails?.jobStatus || 'Todo'}</span>
              </IonText>
            </IonRow>
          </IonCardHeader>
          <IonCardContent className="job-details-content">
            <>
              <IonLabel>
                <strong className='label-title'>Asset:&nbsp;</strong>
                {
                  editableJobDetails?.assetName
                }
              </IonLabel>
              <br />
              <IonLabel>
                <strong className='label-title'>Priority:&nbsp;</strong>
                {
                  editableJobDetails?.priority
                }
              </IonLabel>
              <br />
              <IonLabel>
                <strong className='label-title'>Due Date:&nbsp;</strong>
                {
                  editableJobDetails?.dueDate
                }
              </IonLabel>
              <br />
              <hr />
              <br />
              <IonLabel>
                <strong className='label-title'>Note:&nbsp;</strong>
                {
                  editableJobDetails?.description
                }
              </IonLabel>
              <br />
            </>
            <IonText color="medium">
              <div className='section-header'>Additional Details</div>
              {
                <img src={editableJobDetails?.jobImage} alt="Additional Image" className="job-image" />
              }
              <IonLabel><strong className='label-title'>Start Date:&nbsp;</strong>
                {
                  editableJobDetails?.startDate
                }
              </IonLabel><br />
              <IonLabel><strong className='label-title'>Estimated Labor Time:&nbsp;</strong>
                {
                  editableJobDetails?.estimatedLaborTime
                }
              </IonLabel><br />
              <IonLabel><strong className='label-title'>Work Order Type:&nbsp;</strong>
                {
                  editableJobDetails?.workOrderType
                }
              </IonLabel><br />
              <IonLabel><strong className='label-title'>Linked Work Order:&nbsp;</strong>
                {
                  editableJobDetails?.linkedWorkOrder
                }
              </IonLabel><br />
            </IonText>
            <br />
            <IonLabel><strong className='label-title'>Engineer Remarks:&nbsp;</strong>
              {editableJobDetails?.createdByRemarks}
            </IonLabel>
            <hr />
            <div className="action-buttons">
              <VerificationOptions onQrScan={handleQRScan} onLocationVerify={handleLocationVerification} />
            </div>
            <br />
            <hr />
            <br />
            {
              isChecklistVisible && (
                <>
                  <ChecklistComponent
                    checklists={editableJobDetails?.checklists}
                    readOnly={(editableJobDetails.status.value === STATUS.COMPLETED || editableJobDetails.status.value === STATUS.SUBMITTED)}
                    isEditing={isEditChecklist}
                    handleChecklistChange={handleChecklistChange}
                    handleCheckboxChange={handleCheckboxChange}
                    handleCheckListMode={toggleChecklistMode}
                    onUploadImages={onUploadImages}
                    onRemoveImage={onRemoveImage}
                  />
                  <hr />
                </>
              )
            }
            <IonText color="medium">
              <h3 className='label-title'>Remarks</h3>
              {(editableJobDetails.status.value != STATUS.COMPLETED && editableJobDetails.status.value != STATUS.SUBMITTED) ? (
                <IonTextarea
                  value={editableJobDetails?.assignedToRemarks}
                  onIonChange={(e) => handleChange(e, 'assignedToRemarks')}
                  placeholder="Enter remarks"
                  rows={4}
                  autoGrow={true}
                />

              ) : (
                <p>{editableJobDetails?.assignedToRemarks}</p>
              )}
            </IonText>
            <br />
            {(editableJobDetails.status.value !== STATUS.COMPLETED && editableJobDetails.status.value !== STATUS.SUBMITTED) && (
              <CommonButton
                disabled={(!isChecklistComplete() || isEditChecklist)}
                onClick={onCompleteJob}
                rootClass="checklist-btn"
                label={'Done'}
              />
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonModal>
  );
};

export default TechJobDetailsModal;
