import { FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

import { PageAuth, Aside, Main, MainContent, Form } from './styles';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import { useState } from 'react';
import { database } from '../../services/firebase';

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function handleCreateNewRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim().length === 0) {
      return alert('Digite o nome da sala para continuar...');
    }

    try {
      const roomRef = database.ref('rooms');

      const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id
      });

      history.push(`/rooms/${firebaseRoom.key}`);
    } catch (err) {
      console.log(err);
    }
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