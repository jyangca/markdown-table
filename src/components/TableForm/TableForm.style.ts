import styled from 'styled-components';

export const TableAreaContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  border: none;
  min-width: 500px;
  background-color: ${({ theme }) => theme.color.systemWhite};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

type StyledCellProps = {
  dragOver: boolean;
};
export const Cell = styled.td<StyledCellProps>`
  text-transform: capitalize;
  vertical-align: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.systemE};
  border-left: ${({ dragOver, theme }) =>
    dragOver && `1px dashed ${theme.color.systemA}`};
`;

type StyledThProps = {
  dragOver: boolean;
};
export const StyledTh = styled.th<StyledThProps>`
  white-space: nowrap;
  color: ${({ theme }) => theme.color.system9}
  letter-spacing: 1.5px;
  font-weight: 600;
  font-size: 16px;
  text-transform: capitalize;
  vertical-align: middle;
  padding: 1rem 0;
  margin: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.color.systemE};
  text-transform: uppercase;
  border-radius: 8px;
  border-left: ${({ dragOver, theme }) =>
    dragOver && `1px dashed ${theme.color.systemA}`};

  &:hover {
    background-color: ${({ theme }) => theme.color.systemHover};
  }
`;

export const StyledTr = styled.tr`
  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.color.systemHover};
  }
`;
