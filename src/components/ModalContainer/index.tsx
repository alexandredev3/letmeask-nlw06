import { Modal as ModalTypes } from '../../contexts/ModalContext/types';

import { Modal } from './Modal';

type ModalContainerProps = {
  modal: ModalTypes[];
}

export function ModalContainer({ modal }: ModalContainerProps) {
  return (
    <>
      {modal.map(item => {
        return (
          <Modal 
            id={item.id}
            title={item.title}
            description={item.description}
            icon={item.icon}
            cancel={item.cancel}
            confirm={item.confirm}
          />
        );
      })}
    </>
  );
}