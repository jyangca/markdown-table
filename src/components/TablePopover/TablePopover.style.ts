import styled from 'styled-components';
import { Flex } from '@/components/common';

export const TablePopoverContainer = styled(Flex)`
  padding: 0.5rem;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.color.system7};
`;

export const DividerBox = styled(Flex)`
  border-bottom: 1.5px solid ${({ theme }) => theme.color.systemWhite};
`;
