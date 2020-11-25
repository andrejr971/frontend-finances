import styled, { css } from 'styled-components';

interface LabelProps {
  isChecked: string;
}

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;
`;

export const Label = styled.label<LabelProps>`
  width: 100%;
  height: 52px;
  padding: 14px 16px;
  border: 2px solid var(--gray);
  background: var(--gray);
  border-radius: 16px;
  display: flex;
  align-items: center;

  color: var(--gray-light);

  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  input {
    display: none;
  }

  ${props =>
    props.isChecked === 'income' &&
    css`
      &[for='income'] {
        border-color: var(--blue);
      }
    `}

  ${props =>
    props.isChecked === 'outcome' &&
    css`
      &[for='outcome'] {
        border-color: var(--blue);
      }
    `}

  svg {
    margin-right: 10px;
    font-size: 20px;
    flex-shrink: 0;
  }

  &:first-child {
    svg {
      color: var(--green);
    }
  }

  &:last-child {
    svg {
      color: var(--red);
    }
  }
`;
