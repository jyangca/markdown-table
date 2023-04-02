import React from 'react';
import { InputContainer, InputItem } from './Input.style';

type InputProps = {
  children: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ children, onChange, ...inputProps }: InputProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <InputContainer>
      <InputItem onChange={onChange} value={children} {...inputProps} />
    </InputContainer>
  );
};

export default Input;
