import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  backgroundColor?: string;
  isDisabled?: boolean;
}

export const Container = styled.button<ContainerProps>`
  width: 100%;
  height: 52px;
  padding: 14px 16px;
  border: 0;
  border-radius: 16px;
  background: var(--blue);
  color: #fff;
  font-weight: bold;

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props =>
    props.backgroundColor &&
    css`
      background: ${props.backgroundColor};

      &:hover {
        background: ${shade(0.2, props.backgroundColor)};
      }
    `}
`;
