import React from 'react';
import { Button, Portal } from '@/components/common';
import { ModalButtonContainer, ModalContainer } from './Modal.style';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const handleDimClick = () => {
    onClose();
  };

  return (
    <Portal isOpen={isOpen} onDimClick={handleDimClick} isModal={true}>
      <ModalContainer direction="COLUMN" justify="SPACE_BETWEEN" boxFill>
        {children}
        <ModalButtonContainer justify="CENTER" boxFill>
          <Button fixWidth="60%" size={60} onClick={onClose}>
            Close
          </Button>
        </ModalButtonContainer>
      </ModalContainer>
    </Portal>
  );
};

export default Modal;
