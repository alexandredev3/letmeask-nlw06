import styled from 'styled-components';

export const Container = styled.button`
  height: 40px;
  border-radius: 8px;
  overflow: hidden;

  background: #fff;
  border: 1px solid ${(props) => props.theme.colors.purple};
  cursor: pointer;

  display: flex;

  div {
    height: 45px;
    background: ${(props) => props.theme.colors.purple};
    padding: 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  } 

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 16px 0 12px;
    width: 100%;
    font-size: 14px;
    font-weight: 500;
  }
`;