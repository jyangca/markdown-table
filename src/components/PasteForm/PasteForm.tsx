import React from 'react';
import { PasteFormBox, PasteFormContainer } from './PasteForm.style';

type PasteFormProps = {
  handlePasteOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const PasteForm = ({ handlePasteOnChange }: PasteFormProps) => {
  return (
    <PasteFormContainer>
      <PasteFormBox onChange={handlePasteOnChange}></PasteFormBox>
    </PasteFormContainer>
  );
};

export default PasteForm;
