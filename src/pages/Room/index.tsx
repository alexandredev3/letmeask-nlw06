import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";
import { RoomCode } from '../../components/RoomCode';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import {
  PageRoom,
  Header,
  Content,
  Main,
  UserInfo,
  RoomTitle,
  Form,
  FormFooter,
} from "./styles";

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>

type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}

type RoomParams = {
  id: string;
}

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [title, setTitle] = useState('');

  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    // TODO: fazer uma verificação mais profunda, para saber quais items foram
    // alterados.
    roomRef.on('value', (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([ key, value ]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (question.trim().length === 0) {
      alert("Digite uma pergunta");
      return;
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    const newQuestion = {
      content: question,
      author: {
        name: user.name,
        avatar_url: user.avatar_url,
      },
      isHighlighted: false,
      isAnwered: false,
    }

    await database.ref(`rooms/${roomId}/questions`).push(newQuestion);

    setQuestion('');

    alert('Pergunta enviada com sucesso!');
    return;
  }

  return (
    <PageRoom>
      <Header>
        <Content>
          <img src={logoImg} alt="Letmeask logo" />
          <RoomCode
            code={roomId}
          />
        </Content>
      </Header>

      <Main>
        <RoomTitle>
          <h1>{title}</h1>
          {questions.length !== 0 && (
            <span>{questions.length} pergunta(s)</span>
          )}
        </RoomTitle>

        <Form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setQuestion(event.target.value)}
            value={question}
          />

          <FormFooter>
            {user ? (
              <UserInfo>
                <img src={user.avatar_url} alt={user.name} />
                <span>{user.name}</span>
              </UserInfo>
            ) : (
              <span>
                Para enviar uma pergunta,{" "}
                <button>faça seu login.</button>
              </span>
            )}
            <Button
            type="submit"
            disabled={!user}
            >
              Enviar pergunta
            </Button>
          </FormFooter>
        </Form>

        {JSON.stringify(questions)}
      </Main>
    </PageRoom>
  );
}
