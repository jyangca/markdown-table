import styled from 'styled-components';

export const MarkdownWrapper = styled.div`
  width: 100%;
  max-width: 350px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.color.systemWhite};
`;
