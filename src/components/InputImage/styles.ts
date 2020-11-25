import styled, { css } from 'styled-components';

interface ContainerProps {
  isFilled: boolean;
  isProfile?: boolean;
  isIcon?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 350px;
  height: 200px;
  margin: 0 auto 10px;
  background: #19181f;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;

  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    border-color: var(--blue);

    p svg {
      color: var(--blue);
    }
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    object-fit: cover;
  }

  p {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    border-radius: 5px;
    border: 1px dashed var(--blue);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #9a9a9b;

    svg {
      color: #9a9a9b;
      width: 24px;
      height: 24px;
      margin-bottom: 8px;
    }
  }

  ${props =>
    props.isFilled &&
    css`
      border-color: var(--blue);
    `};

  ${props =>
    props.isProfile &&
    css`
      max-width: 200px;
      height: 200px;

      border-radius: 50%;

      img {
        border-radius: 50%;
      }

      p {
        border-radius: 50%;
      }
    `};

  ${props =>
    props.isIcon &&
    css`
      max-width: 150px;
      height: 150px;

      border-radius: 12px;

      img {
        border-radius: 12px;
      }
    `};
`;
