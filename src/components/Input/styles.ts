import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 52px;
  padding: 14px 16px;
  border: 2px solid var(--gray);
  background: var(--gray);
  border-radius: 16px;
  display: flex;
  align-items: center;

  color: var(--gray-light);

  svg {
    margin-right: 10px;
    opacity: 0.5;
    flex-shrink: 0;
  }

  & + div {
    margin-top: 10px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;

    color: var(--gray-light);
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
      color: #c53030;

      svg {
        opacity: 1;
      }
    `};

  ${props =>
    props.isFocused &&
    css`
      border-color: var(--blue);
      color: var(--blue);

      svg {
        opacity: 1;
      }
    `};

  ${props =>
    props.isFilled &&
    css`
      color: var(--blue);

      svg {
        opacity: 1;
      }
    `};
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 10px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
