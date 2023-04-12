import styled from 'styled-components';
import { Flex, Button } from '@/components/common';

export const MarkdownWrapper = styled(Flex)`
  padding: 1rem;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.systemWhite};

  overflow: auto;
`;

export const MarkdownStyle = styled(Flex)`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1.5px solid ${({ theme }) => theme.color.system5};

  user-select: none;
`;

type CopyButtonProps = {
  copied: boolean;
};
export const CopyButton = styled(Button)<CopyButtonProps>`
  background-color: ${({ theme, copied }) => (copied ? theme.color.systemA : theme.color.system5)};

  box-shadow: 0 0.4rem 0 0 ${({ theme }) => theme.color.system7};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: translateY(0.3rem);
    box-shadow: 0 0.2rem 0 0 ${({ theme }) => theme.color.system9};
  }
`;
