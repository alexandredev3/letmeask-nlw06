import { ReactNode } from "react";

export type ModalProviderProps = {
  children: ReactNode;
}

export type Modal = {
  id: string;
  title: string;
  description: string;
  cancel: {
    text: string;
  };
  confirm: {
    text: string;
    handle: () => Promise<void> | void;
  };
  icon?: string;
}

export type ModalContextProps = {
  addModal: (props: Omit<Modal, 'id'>) => void,
  removeModal: (id: string) => void;
}