import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h2 {
    font-family: 'Poppins';
    font-weight: 600;
    font-size: 18px; 
    margin: 16px 0 8px;
  }

  > p {
    font-family: 'Roboto';
    font-size: 14px;
    width: 284px;
    text-align: center;
    color: ${(props) => props.theme.colors.gray.dark};
  }
`;