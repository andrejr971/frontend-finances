import styled from 'styled-components';

export const Container = styled.tr`
  background: var(--gray);

  td {
    padding: 10px 16px;

    &:first-child {
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
    }

    &.income {
      div {
        color: var(--green);
        display: flex;
        align-items: center;

        svg {
          margin-right: 5px;
          font-size: 20px;
        }
      }
    }

    &.outcome {
      div {
        color: var(--red);
        display: flex;
        align-items: center;

        svg {
          margin-right: 5px;
          font-size: 20px;
        }
      }
    }

    &:nth-child(3) {
      div {
        width: 100%;
        display: flex;
        align-items: center;

        svg {
          margin-right: 5px;
        }
      }
    }

    &:last-child {
      border-top-right-radius: 16px;
      border-bottom-right-radius: 16px;
      text-align: right;
    }

    span {
      display: none;
    }

    button {
      background: var(--blue);
      border: 0;
      width: 42px;
      height: 42px;
      /* display: flex; */
      /* align-items: center; */
      /* justify-content: center; */
      padding: 10px;
      border-radius: 16px;

      svg {
        opacity: 0.8;
        color: #fff;
        font-size: 20px;
      }

      & + button {
        margin-left: 10px;
      }

      &:hover {
        svg {
          opacity: 1;
        }
      }
    }
  }

  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
    border-radius: 16px;

    td {
      padding: 14px 16px;
      border-radius: 0;

      span {
        display: block;
        font-size: 13px;
        opacity: 0.8;
      }

      & + td {
        padding-top: 0;
      }

      &:last-child {
        border-top-right-radius: 0;
        border-bottom-left-radius: 16px;
        background: var(--gray-dark);
        padding-top: 10px;
        width: 100%;
        /* display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 10px; */

        button,
        a {
          margin-left: 0;
        }

        a {
          padding: 10px 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    & + tr {
      margin-top: 10px;
    }
  }
`;
