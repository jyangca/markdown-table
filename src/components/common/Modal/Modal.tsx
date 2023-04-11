import React from 'react';
import { Button, Flex, Portal } from '@/components/common';
import { ModalContainer } from './Modal.style';

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
      <ModalContainer direction="COLUMN" boxFill>
        {children}
        <Button onClick={onClose}>Close</Button>
      </ModalContainer>
    </Portal>
  );
};

export default Modal;
