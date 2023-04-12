import styled from 'styled-components';
import { Flex } from '../common';

export const RootContainer = styled(Flex)`
  overflow: auto;
`;

export const DividerBox = styled(Flex)`
  padding: 1rem;
  border-bottom: 1.5px solid ${({ theme }) => theme.color.systemE};
`;

export const ContentsContainer = styled(Flex)`
  padding: 2rem;
  height: fit-content;
  width: 100%;

  border: 1px solid ${({ theme }) => theme.color.systemA};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.systemE};
`;

export const TypoBox = styled(Flex)`
  padding-left: 0.25rem;
`;

export const ModeContentContainer = styled(Flex)`
  padding: 2rem;
  height: fit-content;

  border: 1px solid ${({ theme }) => theme.color.systemC};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.systemWhite};
`;

type TabItemProps = {
  isSelected: boolean;
};
export const TabItem = styled(Flex)<TabItemProps>`
  background-color: ${({ theme, isSelected }) => (isSelected ? theme.color.systemD : theme.color.systemWhite)};

  height: 32px;
  border-radius: 4px;

  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.color.systemE};
  }
`;
