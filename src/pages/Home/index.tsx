import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import { PageAuth, Aside, Main, MainContent, Form } from './styles';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon-color.svg';

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
    
    
    const fetchRoomPromise: Promise<string | Error> = new Promise((resolve, reject) => {
      const roomRef = database.ref(`rooms/${roomCode}`);
      
      roomRef.get().then(DataSnapshot => {
        const roomExists = DataSnapshot.exists();

        if (!roomExists) {
          throw new Error('Essa sala não existe')
        }

        const roomData = DataSnapshot.val();
        
        if (roomData.endedAt) {
          throw new Error('Essa sala foi encerrada!')
        }

        resolve(`Seja Bem-vindo(a) a sala "${roomData.title}"`);
      }).catch(err => {
        reject(err);
      })
    });

    toast.promise<string | Error>(fetchRoomPromise, {
      loading: 'Encontrando na sala...',
      success: (data) => {
        history.push(`/rooms/${roomCode}`);
        
        return data.toString();
      },
      error: (err) => err.toString(),
    });
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