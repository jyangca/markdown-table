import styled from 'styled-components';
import { Flex, Input } from '@/components/common';

export const PasteFormContainer = styled(Flex)`
  min-height: 300px;
`;

export const PasteFormBox = styled.textarea`
  resize: none;
  padding: 1rem;
  width: 100%;
  height: 100%;

  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.color.system5};
`;

export const PreviewBox = styled(Flex)`
  padding: 1rem;
  height: 100%;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.color.system5};

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
