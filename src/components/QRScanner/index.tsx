import React, { useState } from 'react';
import { IonText, IonButton } from '@ionic/react';
import QrReader from 'react-qr-reader';
import './style.scss';

interface QRScannerProps {
    onScan: (data: string | null) => void;
    onError: (error: any) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError }) => {
    const [showScanner, setShowScanner] = useState(false);

    const handleScan = (data: string | null) => {
        if (data) {
            onScan(data);
            setShowScanner(false);
        }
    };

    const handleError = (error: any) => {
        console.error('QR Scan Error:', error);
        onError(error);
    };

    return (
        <div className="qr-scanner-container">
            {showScanner ? (
                <>
                    {/* <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%' }}
                    /> */}
                    <IonButton color="danger" onClick={() => setShowScanner(false)}>
                        Cancel
                    </IonButton>
                </>
            ) : (
                <IonButton color="primary" onClick={() => setShowScanner(true)}>
                    Open QR Scanner
                </IonButton>
            )}
        </div>
    );
};

export default QRScanner;