import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonRow,
  IonCol,
  IonInput,
  IonLabel,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonButtons,
  IonButton,
  IonModal,
  IonIcon
} from '@ionic/react';
import CommonButton from '../../../components/CommonButton';
import { useToast } from '../../../contexts/ToastContext';
import './style.scss';
import { closeOutline } from 'ionicons/icons';

const CreateWorkOrder: React.FC = (props: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [asset, setAsset] = useState('');
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [assignedTo, setAssignedTo] = useState('');
  const [linkedWorkOrder, setLinkedWorkOrder] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    // Fetch available technicians to assign
    fetchTechniciansList();
  }, []);

  const fetchTechniciansList = async () => {
    try {
      const response = await fetch('/api/technicians'); // Update with the correct API endpoint
      const data = await response.json();
      setTechnicians(data.users || []);
    } catch (error) {
      console.error('Failed to fetch technicians:', error);
      showToast('Failed to load technicians. Please try again.', 'danger');
    }
  };

  const handleCreateWorkOrder = async () => {
    if (!title || !description || !priority || !dueDate || !assignedTo) {
      showToast('Please fill all required fields', 'danger');
      return;
    }

    const payload = {
      title,
      description,
      priority,
      dueDate,
      asset,
      assignedTo,
      linkedWorkOrder,
    };

    console.log('payload', payload);

    // try {
    //   await createWorkOrder(payload); // Call the API to create work order
    //   showToast('Work order created successfully!', 'success');
    //   // Reset form
    //   setTitle('');
    //   setDescription('');
    //   setPriority('');
    //   setDueDate('');
    //   setAsset('');
    //   setAssignedTo('');
    //   setLinkedWorkOrder('');
    // } catch (error) {
    //   console.error('Failed to create work order:', error);
    //   showToast('Failed to create work order. Please try again.', 'danger');
    // }
  };

  return (
    <IonModal className='job-modal' isOpen={props.isOpen} onDidDismiss={props.closeModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Work Order</IonTitle>
          <IonButtons slot="end">
            <IonIcon className="close-icon" onClick={props.closeModal} icon={closeOutline} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonLabel>
                <strong>Title</strong>
              </IonLabel>
              <IonInput
                value={title}
                onIonChange={(e: any) => setTitle(e.target.value)}
                placeholder="Enter work order title"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonLabel>
                <strong>Description</strong>
              </IonLabel>
              <IonTextarea
                value={description}
                onIonChange={(e: any) => setDescription(e.target.value)}
                placeholder="Enter description"
                rows={5}
                autoGrow
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonLabel>
                <strong>Priority</strong>
              </IonLabel>
              <IonSelect
                value={priority}
                placeholder="Select Priority"
                onIonChange={(e) => setPriority(e.detail.value)}
              >
                <IonSelectOption value="low">Low</IonSelectOption>
                <IonSelectOption value="medium">Medium</IonSelectOption>
                <IonSelectOption value="high">High</IonSelectOption>
              </IonSelect>
            </IonCol>
            <IonCol size="6">
              <IonLabel>
                <strong>Due Date</strong>
              </IonLabel>
              <IonInput
                type="date"
                value={dueDate}
                onIonChange={(e: any) => setDueDate(e.target.value)}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonLabel>
                <strong>Asset</strong>
              </IonLabel>
              <IonInput
                value={asset}
                onIonChange={(e: any) => setAsset(e.target.value)}
                placeholder="Enter Asset Name"
              />
            </IonCol>
            <IonCol size="6">
              <IonLabel>
                <strong>Assigned To</strong>
              </IonLabel>
              <IonSelect
                value={assignedTo}
                placeholder="Select Technician"
                onIonChange={(e) => setAssignedTo(e.detail.value)}
              >
                {technicians.map((tech) => (
                  <IonSelectOption key={tech.id} value={tech.id}>
                    {tech.username}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonLabel>
                <strong>Linked Work Order</strong>
              </IonLabel>
              <IonInput
                value={linkedWorkOrder}
                onIonChange={(e: any) => setLinkedWorkOrder(e.target.value)}
                placeholder="Enter Linked Work Order"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <CommonButton
                onClick={handleCreateWorkOrder}
                label="Create Work Order"
                rootClass="create-work-order-btn"
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default CreateWorkOrder;