import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import './style.scss';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';

interface CommonInputProps {
    type?: string;
    placeholder?: string;
    icon?: string;
    value?: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommonInput: React.FC<CommonInputProps> = ({
    type = 'text',
    placeholder = 'Enter the value',
    icon,
    onInputChange,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const isPasswordInput = type === 'password';
    return (
        <div className="common-input-wrapper common-input-container">
            {icon && <IonIcon className="icon" slot="start" icon={icon} />}
            <input
                type={isPasswordInput && isPasswordVisible ? 'text' : type}
                placeholder={placeholder}
                onChange={onInputChange}
                className="common-input"
            />
            {isPasswordInput && (
                <IonIcon
                    className="password-toggle-icon"
                    icon={isPasswordVisible ? eyeOutline : eyeOffOutline}
                    onClick={togglePasswordVisibility}
                />
            )}
        </div>
    );
};

export default CommonInput;
