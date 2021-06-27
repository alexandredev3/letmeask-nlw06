import styled, { css } from 'styled-components';

type ContainerProps = {
  isOutlined: boolean;
}

export const Container = styled.div<ContainerProps>`
  > button {
    height: 58px;
    border-radius: 8px;
    font-weight: 500;
    padding: 0 32px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    border: 0;

    transition: filter 0.2s;

    ${({ isOutlined }) => isOutlined ? css`
      background: #FFF;
      color: ${(props) => props.theme.colors.purple};
      border: 1px solid ${(props) => props.theme.colors.purple};
    ` : css`
      background: ${(props) => props.theme.colors.purple};
      color: #FFF;
    `}

    > img {
      margin-right: 8px;
    }

    &:not(:disabled):hover {
      filter: brightness(0.9);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;