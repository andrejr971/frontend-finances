import React, { createContext, useContext, useCallback, useState } from 'react';
import { v4 } from 'uuid';

import ToastContainer from '../components/ToastContainer';

export interface IToastMessages {
  id: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

interface IToastContextData {
  addToast(message: Omit<IToastMessages, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<IToastContextData>({} as IToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<IToastMessages[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<IToastMessages, 'id'>) => {
      const id = v4();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(state => [...state, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): IToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
