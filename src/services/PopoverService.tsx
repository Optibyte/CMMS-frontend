import React, { useState } from "react";
import { IonPopover } from "@ionic/react";

const usePopoverService = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [event, setEvent] = useState<any>(null);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [onDismissCallback, setOnDismissCallback] = useState<
    (() => void) | null
  >(null);

  const present = (
    ev: any,
    customContent: React.ReactNode,
    callback?: () => void
  ) => {
    setEvent(ev);
    setContent(customContent);
    setOnDismissCallback(() => callback || null);
    setIsOpen(true);
  };

  const dismiss = () => {
    setIsOpen(false);
    setContent(null);
    if (onDismissCallback) {
      onDismissCallback();
    }
  };

  const Popover = () => (
    <IonPopover
      isOpen={isOpen}
      onDidDismiss={dismiss}
      event={event}
      showBackdrop
      className="popover-class"
    >
      {content}
    </IonPopover>
  );

  return { present, dismiss, Popover };
};

export default usePopoverService;
