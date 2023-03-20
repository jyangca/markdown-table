import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  column-gap: 2rem;
`;

const TextAreaForm = styled.textarea`
  width: 100%;
`;

const MarkdownContainer = styled.div`
  width: 100%;
`;

const index = () => {
  const [markdown, setMarkdown] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  return (
    <Container>
      <TextAreaForm onChange={handleChange} />
      <MarkdownContainer>
        <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown} />
      </MarkdownContainer>
    </Container>
  );
};

export default index;
