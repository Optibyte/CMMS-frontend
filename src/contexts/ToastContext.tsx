import React, { createContext, useContext, useState, PropsWithChildren } from 'react';
import { IonToast, IonButton } from '@ionic/react';
import './style.scss';

interface ToastContextProps {
    showToast: (
        message: string,
        color?: string,
        duration?: number,
        position?: 'top' | 'bottom' | 'middle'
    ) => void;
    renderToastButton: (
        buttonText: string,
        message: string,
        color?: string,
        duration?: number,
        position?: 'top' | 'bottom' | 'middle'
    ) => JSX.Element;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [toast, setToast] = useState({
        isOpen: false,
        message: '',
        color: 'primary',
        duration: 3000,
        position: 'bottom' as 'top' | 'bottom' | 'middle',
    });

    const showToast = (
        message: string,
        color: string = 'primary',
        duration: number = 3000,
        position: 'top' | 'bottom' | 'middle' = 'bottom'
    ) => {
        setToast({ isOpen: true, message, color, duration, position });
    };

    const handleDismiss = () => {
        setToast((prev) => ({ ...prev, isOpen: false }));
    };

    const renderToastButton = (
        buttonText: string,
        message: string,
        color: string = 'primary',
        duration: number = 3000,
        position: 'top' | 'bottom' | 'middle' = 'bottom'
    ) => (
        <IonButton
            onClick={() => showToast(message, color, duration, position)}
            expand="block"
            className="custom-toast-button"
        >
            {buttonText}
        </IonButton>
    );

    return (
        <ToastContext.Provider value={{ showToast, renderToastButton }}>
            {children}
            <IonToast
                className="custom-toast"
                isOpen={toast.isOpen}
                message={toast.message}
                // color={toast.color}
                duration={toast.duration}
                position={toast.position}
                onDidDismiss={handleDismiss}
                buttons={[
                    {
                        text: 'Dismiss',
                        role: 'cancel',
                    },
                ]}
            />
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};