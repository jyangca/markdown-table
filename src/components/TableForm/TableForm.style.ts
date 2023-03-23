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

type StyledThProps = {
  dragOver: boolean;
};
export const StyledTh = styled.th<StyledThProps>`
  white-space: nowrap;
  color: ${({ theme }) => theme.color.system9};
  letter-spacing: 1.5px;
  font-weight: 600;
  font-size: 16px;
  text-transform: capitalize;
  text-transform: uppercase;

  vertical-align: middle;

  padding: 1rem 0;
  margin: 1rem;

  border-radius: 8px;
  border-bottom: 2px solid ${({ theme }) => theme.color.systemE};
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
