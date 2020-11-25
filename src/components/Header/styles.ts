import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Container = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999999;

  background: var(--background);
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 100px;
    height: auto;
  }

  nav {
    margin-left: 10px;
    display: flex;
    align-items: center;

    ul {
      display: flex;
      align-items: center;

      li {
        a {
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          padding: 12px 16px;
          border-radius: 16px;

          svg {
            font-size: 20px;
            margin-right: 5px;
          }

          transition: opacity 0.2s, background-color 0.2s;

          &.active {
            background: var(--gray);
          }

          &:hover {
            background: var(--gray);
            opacity: 0.8;
          }
        }

        & + li {
          margin-left: 15px;
        }
      }
    }
  }

  @media (max-width: 700px) {
    nav {
      display: none;
    }
  }
`;

export const RightSide = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const buttonStyles = css`
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 12px 16px;
  width: 50px;
  height: 50px;

  border-radius: 16px;

  background: var(--gray);

  svg {
    font-size: 20px;
  }

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const ButtonTheme = styled.button`
  ${buttonStyles}
`;

export const Profile = styled(Link)`
  display: flex;
  align-items: center;
  margin: 0 10px;
  color: var(--primary);
  font-size: 15px;
  text-decoration: none;

  div {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    border: 2px solid var(--blue);

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  @media (max-width: 700px) {
    strong {
      display: none;
    }
  }

  strong {
    margin-left: 5px;
  }

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const LogOut = styled.button`
  ${buttonStyles}
  cursor: pointer;

  /* @media (max-width: 700px) {
    display: none;
  } */
`;
