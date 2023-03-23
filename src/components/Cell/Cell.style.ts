import styled from 'styled-components';

type StyledTdProps = {
  dragOver: boolean;
};
export const StyledTd = styled.td<StyledTdProps>`
  text-transform: capitalize;
  vertical-align: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.systemE};
  border-left: ${({ dragOver, theme }) =>
    dragOver && `1px dashed ${theme.color.systemA}`};
`;
