import styled from 'styled-components';
import appearFromLeft from '../../utils/appearFromLeft';
import appearFromRight from '../../utils/appearFromRight';

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100vh;

  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  > img {
    width: 400px;

    animation: ${appearFromLeft} 0.5s;
  }

  @media (max-width: 800px) {
    justify-content: center;

    > img {
      display: none;
    }
  }
`;

export const RightSide = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 14px 16px;
  border-radius: 20px;

  /* box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1); */

  display: flex;
  flex-direction: column;
  /* background: var(--gray); */

  animation: ${appearFromRight} 0.5s;

  img {
    display: none;
  }

  @media (max-width: 800px) {
    > img {
      display: initial;
    }
  }

  form {
    margin-top: 20px;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      margin-top: 10px;
    }
  }
`;

export const DivCreateAccount = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;

  a {
    display: flex;
    align-items: center;
    color: var(--blue);
    text-decoration: none;

    &:hover {
      svg {
        margin-right: 20px;
      }
    }

    svg {
      transition: margin-right 0.2s;
      margin-right: 10px;
    }
  }
`;
