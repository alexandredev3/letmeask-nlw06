import styled from 'styled-components';

export const PageAuth = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
`;

export const Aside = styled.div`
  flex: 7;

  background: #835afd;
  color: #FFF;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 128px 80px;

  > img {
    max-width: 320px;
  }

  > strong {
    font: 700 36px 'Poppins', sans-serif;
    line-height: 42px;
    margin-top: 16px;
  }

  > p {
    font-size: 24px;
    line-height: 32px;
    margin-top: 16px;
    color: #f8f8f8;
  }
`;

export const Main = styled.main`
  flex: 8;

  padding: 0 32px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  align-items: stretch;
  text-align: center;

  > img {
    align-self: center;
  }

  h2 {
    font-size: 24px;
    margin: 64px 0 24px;
    font-family: 'Poppins', sans-serif;
  }

  p {
    font-size: 14px;
    color: #737388;
    margin-top: 16px;

    a {
      color: #e559f9;
    }
  }
`; 

export const Form = styled.form`
  input {
    height: 50px;
    border-radius: 8px;
    padding: 0 16px;
    background: #FFF;
    border: 1px solid #a8a8b3;
  }

  button {
    margin-top: 16px;    
  }

  button, input {
    width: 100%;
  }
`;