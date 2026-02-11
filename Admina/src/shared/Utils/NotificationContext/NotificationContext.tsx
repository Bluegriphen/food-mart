import React, { createContext, useContext, useEffect, useState } from 'react';

type AlertType = 'success' | 'danger' | 'warning' | 'primary' | null;

interface NotificationContextProps {
  show: boolean;
  type: AlertType;
  message: string;
  showNotification: (type: AlertType, message: string) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState<AlertType>(null);
  const [message, setMessage] = useState('');

  const showNotification = (alertType: AlertType, alertMessage: string) => {
    setType(alertType);
    setMessage(alertMessage);
    setShow(true);
  };

  const hideNotification = () => {
    setShow(false);
    setType(null);
    setMessage('');
  };

  // Auto-close notification after 3 seconds
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 3000); // 3000ms = 3 seconds

      // Cleanup timeout on unmount or when a new notification is triggered
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <NotificationContext.Provider
      value={{ show, type, message, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  return context;
};
