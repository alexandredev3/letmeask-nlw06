import ReactModal from 'react-modal';

import { useModal } from '../../../hooks/useModal';

import { Button } from '../../Button';

import { 
  Content,
  Footer
} from './styles';

type ModalProps = {
  id: string;
  title: string;
  description: string;
  isOpen?: boolean;
  icon?: string;
  cancel: {
    text: string;
  };
  confirm: {
    text: string;
    handle: () => Promise<void> | void;
  };
}

ReactModal.setAppElement('#root');

export function Modal({
  id,
  title,
  description,
  icon,
  isOpen = true,
  cancel,
  confirm,
}: ModalProps) {
  const { removeModal } = useModal();

  return (
    <ReactModal 
      id={id}
      isOpen={isOpen}
      preventScroll
      shouldCloseOnEsc
      shouldReturnFocusAfterClose
      shouldCloseOnOverlayClick
      aria={{
        labelledby: 'heading',
        describedby: 'description',
        modal: isOpen,
      }}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: 590,
          height: 362,
          border: 0,
          borderRadius: 8,
          background: '#F8F8F8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        overlay: {
          background: 'rgba(0, 0, 0, 0.8)',
        }
      }}
    >
      <Content>
        {icon && (
          <img src={icon} alt="" />
        )}
        
        <h2>{title}</h2>
        <p>{description}</p>

        <Footer>
          <Button className="cancel__button" onClick={() => removeModal(id)}>
            {cancel.text}
          </Button>

          <Button
            className="confirm__button"
            onClick={() => {
              confirm.handle();

              removeModal(id);
            }}
          >
            {confirm.text}
          </Button>
        </Footer>
      </Content>
    </ReactModal>
  )
}