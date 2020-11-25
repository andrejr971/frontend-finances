import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;

  ul {
    width: 100%;
    max-width: 350px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
      cursor: pointer;

      & + li {
        margin-left: 5px;
      }

      &.pages a,
      &.break a {
        color: var(--primary);
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        /* padding: 12px 16px; */
        width: 42px;
        height: 42px;

        border-radius: 16px;

        background: var(--gray);

        svg {
          font-size: 20px;
        }

        transition: opacity 0.2s;

        &:hover {
          opacity: 0.8;
        }
      }

      &.disabled a,
      &.break {
        opacity: 0.5;
        cursor: no-drop;
      }

      &.active a {
        background: var(--blue);
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        padding: 12px 16px;
        width: 42px;
        height: 42px;

        border-radius: 16px;

        color: #fff;

        svg {
          font-size: 20px;
        }

        transition: opacity 0.2s;

        &:hover {
          opacity: 0.8;
        }
      }

      &.previus a,
      &.next a {
        color: var(--primary);
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        /* padding: 12px 16px; */
        width: 42px;
        height: 42px;

        border-radius: 16px;

        background: var(--gray);

        svg {
          font-size: 20px;
        }

        transition: opacity 0.2s;

        &:hover {
          opacity: 0.8;
        }

        @media (max-width: 400px) {
          display: none;
        }
      }
    }
  }
`;
