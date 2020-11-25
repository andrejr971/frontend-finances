import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  cursor: pointer;

  span {
    background: #41356b;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    color: #fff;
    position: absolute;
    bottom: calc(100% + 7px);
    width: 160px;
    left: 50%;
    transform: translateX(-50%);
    visibility: hidden;

    text-align: center;

    &::before {
      content: '';
      border-style: solid;
      border-color: #41356b transparent;
      border-width: 6px 6px 0 6px;
      /* bottom: 20px; */
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    @media (max-width: 550px) {
      display: none;
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
