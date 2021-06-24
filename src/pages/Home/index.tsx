import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import { PageAuth, Aside, Main, MainContent, Form } from './styles';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

export function Home() {
  const { signInWithGoogle, user } = useAuth();
  const history = useHistory();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    try {
      if (!user) {
        await signInWithGoogle();
      }
  
      history.push('/rooms/new');
    } catch (err) {
      alert(err);
    }
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim().length === 0) {
      alert('Digite o código da sala para continuar...');
      return;
    }
    
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Essa sala não existe');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Essa sala foi encerrada!');
      return;
    }

    history.push(`/rooms/${roomCode}`);
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
          <Form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
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