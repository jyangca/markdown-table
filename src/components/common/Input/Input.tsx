import React, { forwardRef } from 'react';
import { InputContainer, InputItem } from './Input.style';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <InputContainer inputProps={props}>
      <InputItem ref={ref} {...props} />
    </InputContainer>
  );
});

Input.displayName = 'Input';

export default Input;
