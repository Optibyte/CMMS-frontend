import React, { useState } from 'react';
import {
    IonCard,
    IonCardContent,
    IonRow,
    IonCol,
    IonIcon,
    IonText,
    IonToggle,
} from '@ionic/react';
import { qrCodeOutline, locationOutline } from 'ionicons/icons';
import './style.scss';

const VerificationOptions = ({ onQrScan, onLocationVerify }: any) => {
    const [isQRScanned, setIsQRScanned] = useState(false);
    const [isLocationVerified, setIsLocationVerified] = useState(false);

    const handleQRScan = (checked: boolean) => {
        setIsQRScanned(checked);
        onQrScan(checked);
    };

    const handleLocationVerification = (checked: boolean) => {
        setIsLocationVerified(checked);
        onLocationVerify(checked);
    };

    return (
        <div className="verification-options">
            <IonText>
                <h2>Verification Status</h2>
            </IonText>
            <IonCard className="verification-card">
                <IonCardContent className="verification-card-content">
                    <IonRow className="ion-align-items-center">
                        <IonCol size="2.5" className="icon-col">
                            <div className="icon-wrapper qr-icon">
                                <IonIcon icon={qrCodeOutline} />
                            </div>
                        </IonCol>
                        <IonCol size="6.5">
                            <IonText>
                                <h3>QR</h3>
                                <p>Verify QR Code</p>
                            </IonText>
                        </IonCol>
                        <IonCol size="3" className="toggle-col">
                            <IonToggle
                                className="toggle"
                                checked={isQRScanned}
                                onIonChange={(e) => handleQRScan(e.detail.checked)}
                            />
                        </IonCol>
                    </IonRow>
                </IonCardContent>
            </IonCard>

            <IonCard className="verification-card">
                <IonCardContent className="verification-card-content">
                    <IonRow className="ion-align-items-center">
                        <IonCol size="2.5" className="icon-col">
                            <div className="icon-wrapper location-icon">
                                <IonIcon icon={locationOutline} />
                            </div>
                        </IonCol>
                        <IonCol size="6.5">
                            <IonText>
                                <h3>Location</h3>
                                <p>Verify Location</p>
                            </IonText>
                        </IonCol>
                        <IonCol size="3" className="toggle-col">
                            <IonToggle
                                className="toggle"
                                checked={isLocationVerified}
                                onIonChange={(e) => handleLocationVerification(e.detail.checked)}
                            />
                        </IonCol>
                    </IonRow>
                </IonCardContent>
            </IonCard>
        </div>
    );
};

export default VerificationOptions;