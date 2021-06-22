import { useHistory } from 'react-router-dom';

import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/useAuth';

import { PageAuth, Aside, Main, MainContent, Form } from './styles';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

export function Home() {
  const { signInWithGoogle, user } = useAuth();
  const history = useHistory();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <Form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type='submit'>
              Entrar na sala
            </Button>
          </Form>
        </MainContent>
      </Main>
    </PageAuth>
  );
}