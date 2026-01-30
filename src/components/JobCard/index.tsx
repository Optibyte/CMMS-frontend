import React, { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonLabel,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonItem,
  IonPopover,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonIcon,
  IonSkeletonText
} from '@ionic/react';
import './style.scss';
import { JobCardProps } from '../../types/JobCardProps';
import { ellipsisVertical, cameraOutline, downloadOutline, createOutline, arrowForward } from 'ionicons/icons';

const JobCard: React.FC<JobCardProps & { isLoading?: boolean }> = ({
  title,
  jobStatus,
  id,
  workOrderId,
  assetName,
  dueDate,
  statusColor,
  jobImage,
  isLoading,
  onViewClick = () => { },
}) => {
  const [showPopover, setShowPopover] = useState(false);

  const handlePopover = () => {
    setShowPopover(!showPopover);
  };

  return (
    <IonCard className="job-card no-shadow" onClick={() => onViewClick()}>
      <IonCardHeader className='no-padding'>
        <IonGrid className="job-grid no-padding">
          <IonRow className='job-title-container'>
            {jobImage && (
              <div className="job-image">
                <img src={jobImage} alt="Job Image" className="task-image" />
              </div>
            )}
            <IonRow className='job-info'>
              <IonCol size="12">
                <IonText className="task-id-text"><h4>{workOrderId}</h4></IonText>
                <IonText className={`status-text ${jobStatus}`}>
                  <span>{jobStatus || 'Todo'}</span>
                </IonText>
              </IonCol>
            </IonRow>
            {/* <IonCol size="1" className="ion-text-right">
              <IonIcon
                id={`click-trigger-${id}`}
                icon={ellipsisVertical}
                onClick={handlePopover}
                className="action-icon"
              />
            </IonCol> */}
          </IonRow>
        </IonGrid>

        {showPopover && (
          <IonPopover
            isOpen={showPopover}
            onDidDismiss={() => setShowPopover(false)}
            trigger={`click-trigger-${id}`}
            triggerAction="context-menu"
            className="popover-menu"
          >
            <IonContent>
              <div className="more-items-container">
                <div className="more-item" onClick={() => onViewClick()}>
                  <IonIcon icon={createOutline} />
                  <span>Open</span>
                </div>
                <div className="more-item">
                  <IonIcon icon={downloadOutline} />
                  <span>Download as PDF</span>
                </div>
                <div className="more-item">
                  <IonIcon icon={cameraOutline} />
                  <span>Attach Image</span>
                </div>
              </div>
            </IonContent>
          </IonPopover>
        )}
      </IonCardHeader>

      <IonCardContent className='job-card-content'>
        <IonRow>
          <IonCol size='10.5'>
            <IonLabel>
              <strong>Title:</strong> {title}
            </IonLabel>
            <br />
            <IonLabel>
              <strong>Asset:</strong> {assetName}
            </IonLabel>
            <br />
            <IonLabel>
              <strong>Date:</strong> {dueDate}
            </IonLabel>
          </IonCol>
          <IonCol className='arrow-icon' size='1.5'>
            <IonIcon icon={arrowForward} />
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

export default JobCard;
