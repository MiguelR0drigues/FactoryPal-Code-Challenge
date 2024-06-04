import { createContext, ReactNode, useState } from "react";

type Toast = string | null;

interface ToastContextProps {
  toast: Toast;
  addToast: (message: Toast) => void;
  removeToast: () => void;
}

export const ToastContext = createContext<ToastContextProps>({
  toast: null,
  addToast: () => {},
  removeToast: () => {},
});

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<Toast>(null);

  const addToast = (message: Toast) => {
    setToast(message);
  };

  const removeToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
