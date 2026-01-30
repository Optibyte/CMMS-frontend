import React from 'react';
import { IonInput, IonLabel, IonText } from '@ionic/react';
import './style.scss';

interface CommonInputProps {
    label: string;
    placeholder?: string;
    value: string;
    type?: 'text' | 'password' | 'number' | 'date' | 'email';
    onChange: (e: any) => void;
    error?: string;
    disabled?: boolean;
}

const CommonIonicInput: React.FC<CommonInputProps> = ({
    label,
    placeholder = '',
    value,
    type = 'text',
    onChange,
    error = '',
    disabled = false,
}) => {
    return (
        <div className="common-ionic-input">
            <IonLabel className="input-label">
                <strong>{label}</strong>
            </IonLabel>
            <IonInput
                type={type}
                placeholder={placeholder}
                value={value}
                onIonChange={onChange}
                className={`input-field ${error ? 'error' : ''}`}
                disabled={disabled}
            />
            {error && <IonText color="danger" className="error-text">{error}</IonText>}
        </div>
    );
};

export default CommonIonicInput;