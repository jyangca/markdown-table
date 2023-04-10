import styled from 'styled-components';
import { Flex } from '@/components/common';

export const HistoryPopoverContainer = styled(Flex)`
  padding: 1rem;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.color.system7};
`;

export const DividerBox = styled(Flex)`
  border-bottom: 1.5px solid ${({ theme }) => theme.color.systemWhite};
`;
