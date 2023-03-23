import React from 'react';
import { InputContainer, InputItem } from './Input.style';

type InputProps = {
  children: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ children, onChange }: InputProps) => {
  return (
    <InputContainer>
      <InputItem onChange={onChange} value={children} />
    </InputContainer>
  );
};

export default Input;
