import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  > img {
    margin-bottom: 30px;
  }

  > h2 {
    font-family: 'Poppins';
    font-size: 24px;

    margin-bottom: 12px;
  }

  > p {
    font-family: 'Roboto';
    font-size: 16px;
    color: ${(props) => props.theme.colors.gray.dark};
  }
`;

export const Footer = styled.footer`
  display: flex;

  margin-top: 40px;

  gap: 8px;

  .cancel__button {
    color: ${(props) => props.theme.colors.gray.dark};
    background: ${(props) => props.theme.colors.gray.light};
  }

  .confirm__button {
    background: ${(props) => props.theme.colors.danger};
  }
`;
