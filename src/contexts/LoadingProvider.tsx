// src/contexts/LoadingProvider.tsx
import React, { PropsWithChildren, ReactNode } from "react";
import { IonLoading } from "@ionic/react";

import { LoadingProvider, useLoading } from "./LoadingContext";
import "./LoadingWrapper.scss";

const LoadingWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useLoading();

  return (
    <>
      {children}
      <IonLoading isOpen={isLoading} />
    </>
  );
};

export const AppWithLoading: React.FC<PropsWithChildren> = ({ children }) => (
  <LoadingProvider>
    <LoadingWrapper>{children}</LoadingWrapper>
  </LoadingProvider>
);
