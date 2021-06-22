import { ButtonHTMLAttributes } from "react";

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return (
    <Container>
      <button className="button" {...props} />
    </Container>
  );
}