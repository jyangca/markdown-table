import styled from 'styled-components';
import { Flex, Input } from '@/components/common';

export const PasteFormContainer = styled(Flex)`
  min-height: 300px;
`;

export const PasteFormBox = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 1rem;

  border: 2px solid ${({ theme }) => theme.color.system5};
  border-radius: 4px;

  resize: none;
`;

export const PreviewBox = styled(Flex)`
  height: 100%;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.color.system5};
  border-radius: 4px;

  user-select: none;
`;

export const PasteFormInput = styled(Input)`
  width: 100px;
  height: 32px;
`;

export const DividerBox = styled(Flex)`
  border-bottom: 1px solid black;
`;

export const SeperationContainer = styled(Flex)`
  padding: 0 1rem;
`;
