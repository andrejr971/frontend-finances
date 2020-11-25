/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react';
import Select, { OptionTypeBase, Props as SelectProps } from 'react-select';
import { useField } from '@unform/core';

import { Container } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

const ReactSelect: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      <Select
        defaultValue={defaultValue}
        ref={selectRef}
        className="select"
        classNamePrefix="select"
        {...rest}
      />
    </Container>
  );
};

export default ReactSelect;
