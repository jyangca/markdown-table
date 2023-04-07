import styled from 'styled-components';
import { Flex } from '@/components/common';

export const TableAreaContainer = styled(Flex)`
  padding: 1rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.systemWhite};
`;

export const Table = styled.table`
  width: 100%;

  border-collapse: collapse;
`;

export const StyledTr = styled.tr`
  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.color.systemHover};
  }
`;
