import { useState, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ModalContainer } from '../../components/ModalContainer';

import { Modal, ModalContextProps, ModalProviderProps } from './types'

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

export function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState<Modal[]>([]);

  function addModal(props: Omit<Modal, 'id'>) {
    const id = uuidv4();

    const newModal = {
      id,
      ...props
    };

    setModal([...modal, newModal]);
  }

  function removeModal(id: string) {
    const modalFiltered = modal.filter((modal) => modal.id !== id);

    setModal(modalFiltered);
  }

  return (
    <ModalContext.Provider
      value={{
        addModal,
        removeModal
      }}
    >
      <ModalContainer 
        modal={modal}
      />
      {children}
    </ModalContext.Provider>
  );
}