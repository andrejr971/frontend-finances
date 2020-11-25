import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps {
  type?: 'info' | 'success' | 'error';
  hasdescription: number;
}

const ToastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b2;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)<ToastProps>`
  width: 320px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;
  cursor: pointer;

  ${props => ToastTypeVariations[props.type || 'info']};

  > svg {
    margin: 0px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 8px;
    top: 13px;
    border: 0;
    background: transparent;
    opacity: 0.6;
    color: inherit;
  }

  & + div {
    margin-top: 10px;
  }

  ${props =>
    !props.hasdescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}

  @media (max-width: 600px) {
    width: 300px;
  }
`;
