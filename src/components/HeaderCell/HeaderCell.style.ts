import styled from 'styled-components';

const StyledTh = styled.th`
  white-space: nowrap;
  color: ${({ theme }) => theme.color.system9};
  letter-spacing: 1.5px;
  font-weight: 600;
  font-size: 16px;
  text-transform: capitalize;
  text-transform: uppercase;

  vertical-align: middle;

  padding: 1rem;
  margin: 1rem;

  border-radius: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.color.systemE};

  user-select: none;

  &.border-bottom-none {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.systemHover};
  }
`;

export default StyledTh;
