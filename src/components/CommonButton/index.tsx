import React from 'react';
import { IonButton } from '@ionic/react';
import './style.scss';
import { CommonButtonProps } from '../../types/ComponentProps';

const CommonButton: React.FC<CommonButtonProps> = ({
    label,
    onClick,
    expand = 'block',
    color = '',
    size = 'default',
    fill = 'solid',
    icon,
    disabled = false,
    rootClass = '',
}) => {
    return (
        <IonButton
            onClick={onClick}
            expand={expand}
            color={color}
            size={size}
            fill={fill}
            disabled={disabled}
            className={`common-button ${rootClass}`}
        >
            {icon && <span className="button-icon">{icon}</span>}
            <span className="button-label">{label}</span>
        </IonButton>
    );
};

export default CommonButton;
