import styled from 'styled-components';

type StyledThProps = {
  isEdit: boolean;
};

const StyledTh = styled.th<StyledThProps>`
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

  cursor: pointer;

  transition: background-color 0.15s ease-in-out;

  &.border-bottom-none {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme, isEdit }) => (isEdit ? theme.color.systemLightBlueHover : theme.color.systemE)};
  }
`;

export default StyledTh;
