import styled from 'styled-components';
import Flex from '../common/Flex/Flex';
import Button from '../common/Button/Button';

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

type CopyButtonProps = {
  copied: boolean;
};
export const CopyButton = styled(Button)<CopyButtonProps>`
  transition: all 0.25s ease-in-out;

  background-color: ${({ theme, copied }) => (copied ? theme.color.systemA : theme.color.system3)};
`;
