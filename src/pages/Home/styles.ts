import styled, { css } from 'styled-components';

interface CardProps {
  type: 'income' | 'outcome' | 'total';
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 14px 16px;
`;

export const ContentCards = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 15px;
`;

export const Card = styled.div<CardProps>`
  background: var(--gray);
  padding: 14px 16px;
  height: 150px;

  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;

  span {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 20px;

    svg {
      font-size: 30px;

      ${props =>
        props.type === 'income' &&
        css`
          color: var(--green);
        `}

      ${props =>
        props.type === 'outcome' &&
        css`
          color: #c53030;
        `}
        
      ${props =>
        props.type === 'total' &&
        css`
          color: var(--blue);
        `}
    }
  }

  strong {
    font-size: 2.3em;
  }
`;

export const Main = styled.main`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 80px;

  table {
    width: 100%;
    text-align: left;
    border-collapse: separate;
    border-spacing: 0 10px;

    thead tr th {
      padding: 0 15px;
      /* border-bottom: 1px solid #1c1b22; */

      &:last-child {
        text-align: right;
      }
    }

    @media (max-width: 750px) {
      thead {
        display: none;
      }
    }
  }
`;

export const Article = styled.article`
  width: 100%;

  header {
    width: 100%;
    display: flex;

    .select {
      width: 100%;
      max-width: 300px;
      color: var(--primary);

      .select__control {
        height: 42px;
        padding: 0 10px;
        border-radius: 16px;
        background: var(--gray);

        .select__control--is_focused {
          border: 2px solid;
          border-color: var(--blue);
        }

        border: 0;
      }
      .select__single-value {
        color: var(--primary);
      }

      .select__menu {
        background: var(--gray);
      }

      .select__option:hover {
        background: var(--background);
      }
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentEmpty = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    font-size: 25px;
  }

  a {
    margin-top: 10px;
    text-decoration: none;
    color: var(--primary);
    padding: 10px;
    border-bottom: 2px solid transparent;

    &:hover {
      color: var(--blue);
      border-color: var(--blue);
      opacity: 0.9;
    }
  }
`;
