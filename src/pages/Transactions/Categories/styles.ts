import styled from 'styled-components';

export const Container = styled.div`
  padding: 14px 16px;

  form {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;

    display: flex;
    align-items: center;

    input {
      flex: 1;
    }

    button {
      margin-left: 10px;
      width: 52px;

      svg {
        font-size: 20px;
      }
    }

    @media (max-width: 400px) {
      flex-direction: column;

      button {
        width: 100%;
        margin: 10px 0 0;
      }
    }
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;

  margin-top: 20px;
`;
