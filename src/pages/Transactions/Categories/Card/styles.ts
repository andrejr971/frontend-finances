import styled from 'styled-components';

export const Container = styled.div`
  padding: 14px 16px;

  background: var(--gray);
  border-radius: 16px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;

  span {
    font-size: 13px;
    display: flex;
    justify-content: flex-end;
  }
`;
