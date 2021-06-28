import styled from "styled-components";

export const Container = styled.header`
  padding: 24px;
  border-bottom: 1px solid #e2e2e2;
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    max-height: 45px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 10px;
  }

  button {
    height: 45px;
  }
`;
