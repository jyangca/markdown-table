import styled from 'styled-components';
import Flex from '../common/Flex/Flex';

export const MarkdownWrapper = styled(Flex)`
  padding: 1rem;
  height: 100%;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.systemWhite};
`;

export const MarkdownStyle = styled(Flex)`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1.5px solid ${({ theme }) => theme.color.system5};
`;
