import styled from 'styled-components';
import Flex from '../common/Flex/Flex';
import Input from '../Input/Input';

export const PasteFormContainer = styled(Flex)`
  padding: 2rem;
  min-height: 300px;
`;

export const PasteFormBox = styled.textarea`
  width: 100%;
  height: 100%;

  border-radius: 4px;
  border: 1.5px solid ${({ theme }) => theme.color.system5};
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
