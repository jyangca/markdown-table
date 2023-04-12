import styled from 'styled-components';
import { Flex } from '@/components/common';

export const TablePopoverContainer = styled(Flex)`
  background-color: ${({ theme }) => theme.color.system7};
  border-radius: 6px;
  padding: 0.5rem;
`;

export const DividerBox = styled(Flex)`
  border-bottom: 1.5px solid ${({ theme }) => theme.color.systemWhite};
`;
