import styled from 'styled-components';

export const PageRoom = styled.div`

`;

export const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;
`;

export const RoomTitle = styled.div`
  margin: 32px 0 24px;
  display: flex;
  align-items: center;

  > h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    color: ${(props) => props.theme.colors.black};
  }

  > span {
    margin-left: 16px;
    background: ${(props) => props.theme.colors.pink.dark};
    border-radius: 9999px;
    padding: 8px 16px;
    color: #FFF;
    font-weight: 500;
    font-size: 14px;
  }
`;

export const QuestionList = styled.div`
  margin-top: 32px;
`;
