import { isServer } from '@/utils/common';
import ReactDOM from 'react-dom';
import { Container, Dim } from './Portal.style';

type PortalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onDimClick?: () => void;
  isModal?: boolean;
};

const Portal = ({ children, isOpen, onDimClick, isModal = false }: PortalProps) => {
  if (isServer()) return null;

  return ReactDOM.createPortal(
    isOpen && (
      <Container role="dialog">
        <Dim aria-hidden="true" onClick={onDimClick} isModal={isModal} />
        {children}
      </Container>
    ),
    document.body,
  );
};

export default Portal;
