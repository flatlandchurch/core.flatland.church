import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import Label from './Label';

const InputStyled = styled.input`
  appearance: none;
  border: 1px solid #d0d4d7;
  border-radius: 8px;
  padding: 12px;
  font-size: 18px;
  width: 100%;

  &:hover {
    border-color: #1f73b7;
  }

  &:focus {
    border-color: #1f73b7;
    box-shadow: 0 0 1px 3px #1f73b755;
    outline: none;
  }
`;

const FormControl = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;
  width: 100%;
`;

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSubmit'>;

const hash = (str: string) => {
  let hashVal = 0;
  for (let i = 0; i < str.length; i++) {
    hashVal = (hashVal << 5) - hashVal + str.charCodeAt(i);
  }
  return Math.abs(hashVal & ~(0 << 31)).toString(16);
};

const Input = (props: Props) => {
  const { label, value, onChange, ...rest } = props;

  return (
    <FormControl>
      <Label htmlFor={hash(label)}>{label}</Label>
      <InputStyled
        id={hash(label)}
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};

export default Input;
