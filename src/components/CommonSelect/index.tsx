import React from 'react';
import { IonSelect, IonSelectOption, IonLabel, IonText } from '@ionic/react';
import './style.scss';

interface CommonSelectProps {
    label: string;
    placeholder?: string;
    options: { label: string; value: string }[];
    value: string | string[];
    onChange: (e: any) => void;
    error?: string;
    multiple?: boolean;
    disabled?: boolean;
}

const CommonSelect: React.FC<CommonSelectProps> = ({
    label,
    placeholder = '',
    options,
    value,
    onChange,
    error = '',
    multiple = false,
    disabled = false,
}) => {
    return (
        <div className="common-select">
            <IonLabel className="select-label">
                <strong>{label}</strong>
            </IonLabel>
            <IonSelect
                placeholder={placeholder}
                value={value}
                onIonChange={onChange}
                multiple={multiple}
                className={`select-field ${error ? 'error' : ''}`}
                disabled={disabled}
            >
                {options.map((option, index) => (
                    <IonSelectOption key={index} value={option.value}>
                        {option.label}
                    </IonSelectOption>
                ))}
            </IonSelect>
            {error && <IonText color="danger" className="error-text">{error}</IonText>}
        </div>
    );
};

export default CommonSelect;