import React from 'react';
import { InputContainer, InputItem } from './Input.style';

type InputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ onChange, ...inputProps }: InputProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <InputContainer>
      <InputItem onChange={onChange} {...inputProps} />
    </InputContainer>
  );
};

export default Input;
