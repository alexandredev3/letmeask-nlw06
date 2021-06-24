import { ButtonHTMLAttributes } from "react";

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ 
  isOutlined = false, 
  ...rest 
}: ButtonProps) {
  return (
    <Container isOutlined={isOutlined}>
      <button className="button" {...rest} />
    </Container>
  );
}