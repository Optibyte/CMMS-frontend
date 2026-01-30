import React from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import './style.scss';

function AddButton(props: any) {
  return (
    <IonFab className='add-button' horizontal="end" vertical="bottom" slot="fixed">
      <IonFabButton onClick={props.onclickFabButton}>
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
}
export default AddButton;