import styled from 'styled-components';
import { Flex } from '@/components/common';

export const ModalContainer = styled(Flex)`
  padding: 2rem;
  background-color: ${({ theme }) => theme.color.systemHover};
  width: 650px;
  height: 800px;
  border-radius: 8px;
  z-index: 1000;
`;
