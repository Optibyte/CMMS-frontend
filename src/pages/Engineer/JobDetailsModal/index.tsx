import React, { useEffect, useState } from 'react';
import {
  IonButtons,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonLabel,
  IonText,
  IonRow,
  IonCol,
  IonInput,
  IonCheckbox,
  IonItem,
  IonCardTitle,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import './style.scss';
import ChecklistComponent from '../../../components/JobCheckList';
import { closeOutline } from 'ionicons/icons';
import { approveTask, assignTask, fetchTechnicians, updateTask } from '../../../api/task';
import { useToast } from '../../../contexts/ToastContext';
import machine1 from '../../../assets/machine_1.png';
import machine2 from '../../../assets/machine_2.png';
import machine3 from '../../../assets/machine_3.png';
import CommonButton from '../../../components/CommonButton';
import { STATUS } from '../../../constants/status';
import { useLoading } from '../../../contexts/LoadingContext';

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
}

const EngJobDetailsModal: React.FC<JobDetailsModalProps> = ({
  isOpen,
  closeModal,
  jobDetails,
}) => {
  const [isEditChecklist, setIsEditChecklist] = useState(false);
  const [editableJobDetails, setEditableJobDetails] = useState(jobDetails);
  const [assignedTo, setAssignedTo] = useState('');
  const [approvalRemarks, setApprovalRemarks] = useState('');
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [rescheduleDate, setRescheduleDate] = useState(jobDetails?.dueDate || '');
  const { showToast } = useToast();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (jobDetails?.dueDate) {
      setRescheduleDate(jobDetails.dueDate);
    }
  }, [jobDetails]);



  useEffect(() => {
    if (!jobDetails?.status || jobDetails.status.value == STATUS.TO_DO) {
      fetchTechniciansList();
    }
  }, [jobDetails]);

  const fetchTechniciansList = async () => {
    try {
      const response = await fetchTechnicians();
      setTechnicians(response || []);
    } catch (error) {
      console.error('Failed to fetch technicians:', error);
    }
  };

  // Handle checklist item changes
  const handleChecklistChange = (e: any, index: number, field: string) => {
    const updatedChecklist = [...editableJobDetails.checklists];
    updatedChecklist[index][field] = e.target.value;
    setEditableJobDetails({
      ...editableJobDetails,
      checklists: updatedChecklist,
    });
  };

  const handleCheckboxChange = (e: any, index: number) => {
    const updatedChecklist = [...editableJobDetails.checklists];
    updatedChecklist[index].status = e.target.checked ? STATUS.COMPLETED : STATUS.PENDING;
    setEditableJobDetails({
      ...editableJobDetails,
      checklists: updatedChecklist,
    });
  };

  const toggleChecklistMode = () => {
    setIsEditChecklist(!isEditChecklist);
  };

  const prepareTaskUpdatePayload = (data: any, status: Number) => {
    return {
      status: status,
      createdByRemarks: approvalRemarks,
    };
  };

  const handleAssignTask = async () => {
    try {
      showLoading();
      await assignTask(editableJobDetails.id, assignedTo);
      const payload = {
        status: STATUS.IN_PROGRESS
      };
      await updateTask(editableJobDetails.id, payload);
      closeModal();
      hideLoading();
      showToast('Successfully assigned the task..!');
    } catch (error) {
      hideLoading();
      console.error('Failed to assign task:', error);
    }
  };

  const handleTaskAction = async (isApproved: boolean) => {
    try {
      if (!isApproved && !rescheduleDate) {
        showToast('Please select a date for rescheduling.');
        return;
      }

      showLoading();
      const status = isApproved ? STATUS.COMPLETED : STATUS.TO_DO;

      const taskpayload: any = {
        status: status,
        createdByRemarks: approvalRemarks,
      };

      if (!isApproved) {
        taskpayload.dueDate = rescheduleDate;
      }

      await updateTask(editableJobDetails.id, taskpayload);
      closeModal();
      hideLoading();
      showToast(isApproved ? 'Successfully approved the task..!' : 'Task returned for rescheduling..!');
    } catch (error) {
      hideLoading();
      console.error('Failed to update task action:', error);
      showToast('Failed to update task status');
    }
  };

  return (
    <IonModal className="job-modal" isOpen={isOpen} onDidDismiss={closeModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Work Order: {editableJobDetails?.workOrderId}</IonTitle>
          <IonButtons slot="end">
            <IonIcon
              className="close-icon"
              onClick={closeModal}
              icon={closeOutline}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="job-details-card">
          <IonCardHeader className="job-details-header">
            <IonRow>
              <IonCardTitle className="job-title">
                {editableJobDetails?.title}
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
                <strong className="label-title">Asset:&nbsp;</strong>
                {editableJobDetails?.assetName}
              </IonLabel>
              <br />
              <IonLabel>
                <strong className="label-title">Priority:&nbsp;</strong>
                {editableJobDetails?.priority}
              </IonLabel>
              <br />
              <IonLabel>
                <strong className="label-title">Due Date:&nbsp;</strong>
                {editableJobDetails?.dueDate}
              </IonLabel>
              <br />
              <hr />
              <IonLabel>
                <strong className="label-title">Note:&nbsp;</strong>
                {editableJobDetails?.description}
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
            <IonLabel><strong className='label-title'>Technician Remarks:&nbsp;</strong>
              {editableJobDetails?.assignedToRemarks}
            </IonLabel>
            <hr />
            {(!!editableJobDetails?.checklists.length) && <><ChecklistComponent
              checklists={editableJobDetails?.checklists}
              readOnly={true}
              isEditing={isEditChecklist}
              handleChecklistChange={handleChecklistChange}
              handleCheckboxChange={handleCheckboxChange}
              handleCheckListMode={toggleChecklistMode}
            />
              <hr />
            </>
            }
            {editableJobDetails.status && editableJobDetails.status.value === STATUS.TO_DO && ((editableJobDetails.approveStatus.value == STATUS.APPROVED) ? (
              <div>
                <br />
                <IonLabel>
                  <strong>Assign To:</strong>
                </IonLabel>
                <IonSelect
                  placeholder="Select Technician"
                  value={assignedTo}
                  onIonChange={(e) => setAssignedTo(e.detail.value)}
                  className="assign-select"
                >
                  {technicians.map((tech) => (
                    <IonSelectOption key={tech.id} value={tech.id}>
                      {tech.username}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                <CommonButton onClick={handleAssignTask} rootClass="assign-button" label={'Assign Task'}></CommonButton>
              </div>
            ) :
              <IonLabel><strong className='label-title'>Approval Status:&nbsp;</strong>
                Waiting for approval
              </IonLabel>)
            }
            {editableJobDetails.status.value === STATUS.SUBMITTED && (
              <div className="approve-section">
                <br />
                <IonLabel>
                  <strong>Process Task Submission:</strong>
                </IonLabel>
                <hr />

                <IonLabel>
                  <strong>Approval/Rejection Remarks:</strong>
                </IonLabel>
                <IonInput
                  placeholder="Add remarks here..."
                  value={approvalRemarks}
                  onIonChange={(e: any) => setApprovalRemarks(e.detail.value)}
                  className="approval-remarks"
                />

                <IonLabel>
                  <strong>Reschedule To (If not approved):</strong>
                </IonLabel>
                <IonInput
                  type="date"
                  value={rescheduleDate}
                  onIonChange={(e: any) => setRescheduleDate(e.detail.value)}
                  className="reschedule-date"
                />

                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <CommonButton
                    onClick={() => handleTaskAction(true)}
                    rootClass="approve-button"
                    label={'Approve Task'}
                  />
                  <CommonButton
                    onClick={() => handleTaskAction(false)}
                    rootClass="reschedule-button"
                    label={'Reschedule Task'}
                  />
                </div>
              </div>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonModal>
  );
};

export default EngJobDetailsModal;