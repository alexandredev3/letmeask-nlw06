import { Link } from 'react-router-dom';

import { Button } from '../../components/Button';

import { PageAuth, Aside, Main, MainContent, Form } from './styles';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/useAuth';

export function NewRoom() {
  // const { user } = useAuth();

  return (
    <PageAuth>
      <Aside>
        <img src={illustrationImg} alt="Ilustração simolizando perguntas e respostas" />
        <strong>Crie salas de G&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </Aside>
      <Main>
        <MainContent>
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <Form>
            <input
              type="text"
              placeholder="Nome da sala"
            />
            <Button type='submit'>
              Criar sala
            </Button>
          </Form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </MainContent>
      </Main>
    </PageAuth>
  );
}