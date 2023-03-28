import styled from 'styled-components';

export const TableAreaContainer = styled.div`
  width: 100%;
  min-width: 500px;

  border-radius: 8px;
  border: none;

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
