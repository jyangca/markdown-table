import styled from 'styled-components';

export const StyledTd = styled.td`
  text-align: center;
  vertical-align: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.systemE};
  transition: background-color 0.1s ease 0s;

  user-select: none;

  &.selected {
    background-color: ${({ theme }) => theme.color.systemLightBlue};
  }
  &.border-bottom-none {
    border-bottom: none;
  }
  &.selected.border-top {
    border-top: 1px solid ${({ theme }) => theme.color.systemBlue};
  }
  &.selected.border-bottom {
    border-bottom: 1px solid ${({ theme }) => theme.color.systemBlue};
  }
  &.selected.border-left {
    border-left: 1px solid ${({ theme }) => theme.color.systemBlue};
  }
  &.selected.border-right {
    border-right: 1px solid ${({ theme }) => theme.color.systemBlue};
  }

  &.copied {
    background-color: ${({ theme }) => theme.color.systemBlue} !important;
    transition: background-color 0.05s ease 0s;
  }
`;
