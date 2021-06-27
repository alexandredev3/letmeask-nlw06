import emptyQuestionsImg from "../../assets/images/empty-questions.svg";

import { Container } from './styles';

export function EmptyQuestions() {
  return (
    <Container>
      <img src={emptyQuestionsImg} alt="Ainda não perguntas" />
      <h2>Nenhuma pergunta por aqui...</h2>
      <p>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!</p>
    </Container>
  );
}