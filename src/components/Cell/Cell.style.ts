import styled from 'styled-components';

export const StyledTd = styled.td`
  text-transform: capitalize;
  vertical-align: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.systemE};

  user-select: none;

  &.selected {
    background-color: ${({ theme }) => theme.color.systemLightBlue};
  }
`;
