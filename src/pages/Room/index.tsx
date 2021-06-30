import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { database } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";

import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { EmptyQuestions } from "../../components/EmptyQuestions";
import { Header } from '../../components/Header';

import {
  PageRoom,
  Main,
  UserInfo,
  RoomTitle,
  Form,
  FormFooter,
  QuestionList,
} from "./styles";

type RoomParams = {
  id: string;
};

export function Room() {
  const { user, signInWithGoogle } = useAuth();
  const params = useParams<RoomParams>();
  const [question, setQuestion] = useState("");

  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (question.trim().length === 0) {
      alert("Digite uma pergunta");
      return;
    }

    if (!user) {
      throw new Error("You must be logged in");
    }

    const sendQuestionPromise: Promise<string | Error> = 
      new Promise((resolve, reject) => {
        const roomRef = database.ref(`rooms/${roomId}/questions`);
        
        const newQuestion = {
          content: question,
          author: {
            name: user.name,
            avatar_url: user.avatar_url,
          },
          isHighlighted: false,
          isAnswered: false,
        };

        roomRef.push(newQuestion).then(() => {
          resolve('Pergunta foi enviada com sucesso!');
        }).catch(err => {
          reject(err);
        })
      });

    toast.promise<string | Error>(sendQuestionPromise, {
      loading: 'Enviando pergunta...',
      success: (data) => data.toString(),
      error: (err) => err.toString(),
    });

    setQuestion("");
    return;
  }

  async function handleLikeQuestion(id: string, likeId: string | undefined) {
    // TODO: Criar regra no firebase para o usuario não conseguir criar mais de
    // um like na mesma pergunta.
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${id}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${id}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  return (
    <PageRoom>
      <Header
        roomId={roomId}
      />

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
            onChange={(event) => setQuestion(event.target.value)}
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
                Para enviar uma pergunta,
                <button type="button" onClick={() => signInWithGoogle()}>
                  faça seu login.
                </button>
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </FormFooter>
        </Form>

        <QuestionList>
          {questions.length === 0 ? (
            <EmptyQuestions />
          ) : (
            <>
              {questions.map((question) => (
                <Question
                  key={question.id}
                  content={question.content}
                  author={{
                    name: question.author.name,
                    avatar_url: question.author.avatar_url,
                  }}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <button
                      className={`like-button ${question.likeId && "liked"}`}
                      type="button"
                      aria-label="Marcar como gostei"
                      onClick={() =>
                        handleLikeQuestion(question.id, question.likeId)
                      }
                    >
                      {question.likesCount !== 0 && (
                        <span>{question.likesCount}</span>
                      )}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                          stroke="#737380"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </Question>
              ))}
            </>
          )}
        </QuestionList>
      </Main>
    </PageRoom>
  );
}
