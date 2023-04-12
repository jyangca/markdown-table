import styled from 'styled-components';
import { Flex } from '@/components/common';

export const HistoryPopoverContainer = styled(Flex)`
  background-color: ${({ theme }) => theme.color.system7};
  border-radius: 6px;
  padding: 1rem;
`;

export const DividerBox = styled(Flex)`
  border-bottom: 1.5px solid ${({ theme }) => theme.color.systemWhite};
`;
