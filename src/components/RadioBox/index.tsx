/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, InputHTMLAttributes, useState } from 'react';
import { useField } from '@unform/core';
import { FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi';
import { Container, Label } from './styles';

interface RadioBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  clean?: boolean;
  setClean(clean: boolean): void;
}

const RadioBox: React.FC<RadioBoxProps> = ({
  name,
  clean,
  setClean,
  ...rest
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [isChecked, setIsChecked] = useState(defaultValue);

  useEffect(() => {
    if (clean) {
      setIsChecked('');
      setClean(false);
    }
  }, [clean, setClean]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach(ref => {
          ref.checked = false;
        });
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <Container>
      <Label htmlFor="income" isChecked={isChecked}>
        <input
          ref={ref => {
            inputRefs.current[0] = ref as HTMLInputElement;
          }}
          name={name}
          value="income"
          type="radio"
          id="income"
          onChange={() => setIsChecked('income')}
          defaultChecked={defaultValue === 'income'}
          {...rest}
        />
        <FiArrowUpCircle />
        Entrada
      </Label>

      <Label htmlFor="outcome" isChecked={isChecked}>
        <input
          ref={ref => {
            inputRefs.current[1] = ref as HTMLInputElement;
          }}
          name={name}
          value="outcome"
          type="radio"
          id="outcome"
          onChange={() => setIsChecked('outcome')}
          defaultChecked={defaultValue === 'outcome'}
          {...rest}
        />
        <FiArrowDownCircle />
        Saída
      </Label>
    </Container>
  );
};

export default RadioBox;
