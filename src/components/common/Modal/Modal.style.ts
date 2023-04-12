import styled from 'styled-components';
import { Flex } from '@/components/common';

export const ModalContainer = styled(Flex)`
  padding: 2rem;
  background-color: ${({ theme }) => theme.color.systemHover};
  width: 650px;
  max-height: 800px;
  border-radius: 8px;
  z-index: 1000;
`;

export const ModalButtonContainer = styled(Flex)`
  border-top: 1px solid ${({ theme }) => theme.color.systemD};
  padding: 1rem 1rem 0 1rem;
`;
