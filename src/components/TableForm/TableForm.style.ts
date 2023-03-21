import styled from 'styled-components';

export const TableAreaContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  border: none;
  min-width: 500px;
  background-color: ${({ theme }) => theme.color.systemWhite};
`;

export const Table = styled.table`
  border-collapse: collapse;
`;

type StyledCellProps = {
  dragOver: boolean;
};
export const Cell = styled.td<StyledCellProps>`
  font-size: 14px;
  text-align: left;
  text-transform: capitalize;
  vertical-align: center;
  padding: 20px;
  border-bottom: 2px solid #eef0f5;
  text-transform: lowercase;
  border-left: ${({ dragOver }) => dragOver && '5px solid red'};
`;

type StyledThProps = {
  dragOver: boolean;
};
export const StyledTh = styled.th<StyledThProps>`
  white-space: nowrap;
  color: #716f88;
  letter-spacing: 1.5px;
  font-weight: 600;
  font-size: 14px;
  text-align: left;
  text-transform: capitalize;
  vertical-align: middle;
  padding: 20px;
  border-bottom: 2px solid #eef0f5;
  text-transform: uppercase;
  border-left: ${({ dragOver }) => dragOver && '5px solid red'};
`;
