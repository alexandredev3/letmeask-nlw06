import Lottie, { Options } from 'react-lottie';

import loadingAnimation from './loading_animation.json';

import { Container } from './styles';

export function Loading() {
  const animationOptions: Options = {
    autoplay: true,
    loop: true,
    animationData: loadingAnimation,
  }

  return (
    <Container>
      <Lottie
        options={animationOptions}
        height={200}
        width={200}
      />
    </Container>
  );
}