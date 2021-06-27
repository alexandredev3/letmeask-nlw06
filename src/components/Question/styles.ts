import styled, { css } from 'styled-components';

type ContainerProps = {
  isAnswered: boolean;
  isHighlighted: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${(props) => props.theme.colors.white.details};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;

  ${({ isHighlighted, isAnswered }) => {
    if (isHighlighted) {
      return css`
        background: #F4F0FF;
        border: 1px solid ${(props) => props.theme.colors.purple};

        .user-info > span {
          color: ${(props) => props.theme.colors.black};
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
    color: ${(props) => props.theme.colors.black};
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
      color: ${(props) => props.theme.colors.purple};

      svg > path {
        stroke: ${(props) => props.theme.colors.purple};
      }
    }

    &.like-button {
      display: flex;
      align-items: flex-end;
      color: ${(props) => props.theme.colors.gray.dark};
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
    color: ${(props) => props.theme.colors.gray.dark};
    font-size: 14px;
  }
`;
