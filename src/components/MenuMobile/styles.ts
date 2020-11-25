import styled from 'styled-components';

export const Container = styled.div`
  @media (min-width: 700px) {
    display: none;
  }

  display: flex;
  height: 70px;
  width: 100%;
  background: var(--gray);

  position: fixed;
  z-index: 9999999;
  bottom: 0;
  left: 0;

  box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.1);

  nav {
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: center;
    width: 100%;

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

          /* span {
            display: none;
          } */

          transition: opacity 0.2s, background-color 0.2s;

          &.active {
            background: var(--background);

            span {
              display: initial;
            }
          }

          &:hover {
            background: var(--background);
            opacity: 0.8;
          }
        }

        & + li {
          margin-left: 15px;
        }
      }
    }
  }
`;
