import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;

  > h1 {
    font-size: 25px;
    padding-bottom: 5px;
    border-bottom: 1px solid #1c1b22;
  }
`;

export const Main = styled.main`
  height: 100%;
  width: 100%;
  max-width: 700px;
  padding: 10px;
  margin: 10px auto;
`;

export const FooterForm = styled.footer`
  display: flex;
  width: 100%;
  margin-top: 10px;

  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      margin-right: 10px;
    }
  }
`;

export const DivLoading = styled.div`
  width: 100%;
  height: calc(100vh - 130px);

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    height: calc(100vh - 250px);
  }
`;

export const DivPassword = styled.div`
  > hr {
    margin: 10px 0;
    opacity: 0.1;
  }
`;

export const GroupInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  div + div {
    margin: 0;
  }

  margin-bottom: 10px;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;
