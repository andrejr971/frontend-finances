import styled from 'styled-components';

export const Container = styled.div`
  .select {
    width: 100%;
    color: var(--primary);

    .select__control {
      height: 52px;
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
`;
