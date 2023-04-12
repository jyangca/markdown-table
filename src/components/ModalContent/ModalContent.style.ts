import styled from 'styled-components';
import { Flex } from '../common';

export const DividerBox = styled(Flex)`
  padding: 1rem;
  border-bottom: 1.5px solid ${({ theme }) => theme.color.systemE};
`;

export const ContentsContainer = styled(Flex)`
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.color.systemA};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.systemE};
  height: fit-content;
  width: 100%;
`;

export const TypoBox = styled(Flex)`
  padding-left: 0.25rem;
`;

export const ModeContentContainer = styled(Flex)`
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.color.systemC};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.systemWhite};
  height: fit-content;
`;
