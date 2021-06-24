import { useHistory, useParams } from 'react-router-dom';

import logoImg from "../../assets/images/logo.svg";
import deleteImg from '../../assets/images/delete.svg';

import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';

import { database } from '../../services/firebase';

import { Button } from "../../components/Button";
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import {
  PageRoom,
  Header,
  Content,
  Main,
  RoomTitle,
  QuestionList,
} from "./styles";

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const history = useHistory();
  
  const roomId = params.id;
  
  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    const confirmed = window.confirm('Tem certeza que deseja encerrar a sala?');

    if (confirmed) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      });

      return history.push('/');
    }

    return;
  }

  async function handleDeleteQuestion(id: string) {
    const confirmed = window.confirm('Tem certeza que deseja deletar essa pergunta?');

    if (confirmed) {
      await database.ref(`rooms/${roomId}/questions/${id}`).remove();
      return;
    }

    return;
  }

  return (
    <PageRoom>
      <Header>
        <Content>
          <img src={logoImg} alt="Letmeask logo" />
          <div>
            <RoomCode
              code={roomId}
            />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </Content>
      </Header>

      <Main>
        <RoomTitle>
          <h1>{title}</h1>
          {questions.length !== 0 && (
            <span>{questions.length} pergunta(s)</span>
          )}
        </RoomTitle>

        <QuestionList>
          {
            questions.map(question => (
              <Question
                key={question.id}
                content={question.content} 
                author={{
                  name: question.author.name, 
                  avatar_url: question.author.avatar_url
                }} 
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Deletar pergunta" />
                </button>
              </Question>
            ))
          }
        </QuestionList>
      </Main>
    </PageRoom>
  );
}
