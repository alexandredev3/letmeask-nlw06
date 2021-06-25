import styled, { css } from 'styled-components';

type ContainerProps = {
  isAnswered: boolean;
  isHighlighted: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fefefe;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;

  ${({ isHighlighted, isAnswered }) => {
    if (isHighlighted) {
      return css`
        background: #F4F0FF;
        border: 1px solid #835AFD;

        .user-info > span {
          color: #29292E;
        }
      `;
    } else if(isAnswered) {
      return css`
        background: #D8DCDD;
        opacity: 0.7;
        cursor: not-allowed;
      `;
    } else {
      return css`

      `;
    }
  }}

  & + & {
    margin-top: 8px;
  }

  > p {
    color: 29292e;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;

  > div {
    display: flex;
    gap: 16px;
  }

  button {
    border: 0;
    background: transparent;
    cursor: pointer;


    &.liked, &.answered, &.highlighted {
      color: #835afd;

      svg > path {
        stroke: #835afd;
      }
    }

    &.like-button {
      display: flex;
      align-items: flex-end;
      color: #737380;
      gap: 8px;

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.7);
      }
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  > span {
    margin-left: 8px;
    color: #737380;
    font-size: 14px;
  }
`;
