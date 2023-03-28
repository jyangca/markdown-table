import styled from 'styled-components';

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

  &:hover {
    background-color: ${({ theme }) => theme.color.systemHover};
  }
`;
