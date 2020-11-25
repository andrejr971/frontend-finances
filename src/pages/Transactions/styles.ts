import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  header {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;

    nav {
      display: flex;
      align-items: center;
      justify-content: center;

      a {
        text-decoration: none;
        color: var(--primary);
        padding: 10px;
        border-bottom: 2px solid transparent;

        & + a {
          margin-left: 10px;
        }

        &.active {
          color: var(--blue);
          border-color: var(--blue);
        }
      }
    }
  }

  main {
    margin-top: 20px;
    width: 100%;
  }
`;
