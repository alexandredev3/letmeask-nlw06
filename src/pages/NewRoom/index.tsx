import { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { useAuth } from '../../hooks/useAuth';

import { firebase, database } from '../../services/firebase';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import { Button } from '../../components/Button';

import { PageAuth, Aside, Main, MainContent, Form } from './styles';

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function handleCreateNewRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim().length === 0) {
      return alert('Digite o nome da sala para continuar...');
    }

    const createRoomPromise: Promise<firebase.database.Reference> = 
      new Promise((resolve, reject) => {
        const roomRef = database.ref('rooms');

        roomRef.push({
          title: newRoom,
          authorId: user?.id
        }).then(DataSnapshot => {
          resolve(DataSnapshot);
        }).catch(err => {
          reject(err);
        })
      });

    toast.promise<firebase.database.Reference>(createRoomPromise, {
      loading: 'Criando sala...',
      success: (data) => {
        history.push(`/rooms/${data.key}`);
        
        return `
          A sala "${newRoom}" foi criada com sucesso!
        `;
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
          <h2>Criar uma nova sala</h2>
          <Form onSubmit={handleCreateNewRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={event => setNewRoom(event.target.value)}
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