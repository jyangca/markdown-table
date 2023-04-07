import { isServer } from '@/utils/common';
import ReactDOM from 'react-dom';
import { Container, Dim } from './Portal.style';

type PortalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onDimClick?: () => void;
};

const Portal = ({ children, isOpen, onDimClick }: PortalProps) => {
  if (isServer()) return null;

  return ReactDOM.createPortal(
    isOpen && (
      <Container role="dialog">
        <Dim aria-hidden="true" onClick={onDimClick} />
        {children}
      </Container>
    ),
    document.body,
  );
};

export default Portal;
