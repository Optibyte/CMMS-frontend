// components/MyPopover.tsx
import React from "react";
import { IonPopover } from "@ionic/react";

interface MyPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MyPopover: React.FC<MyPopoverProps> = ({ isOpen, onClose, children }) => (
  <IonPopover isOpen={isOpen} onDidDismiss={onClose}>
    {children}
  </IonPopover>
);

export default MyPopover;
