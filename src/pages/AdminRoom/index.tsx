import { useHistory, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import deleteImg from "../../assets/images/delete.svg";
import deleteIconImg from "../../assets/images/delete-icon.svg";
import xIconImg from '../../assets/images/x-icon.svg';

import { useRoom } from "../../hooks/useRoom";

import { database } from "../../services/firebase";

import { Question } from "../../components/Question";
import { EmptyQuestions } from "../../components/EmptyQuestions";
import { Header } from '../../components/Header';

import {
  PageRoom,
  Main,
  RoomTitle,
  QuestionList,
} from "./styles";
import { useModal } from "../../hooks/useModal";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { addModal } = useModal();

  const params = useParams<RoomParams>();
  const history = useHistory();

  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    addModal({
      icon: xIconImg,
      title: "Encerrar sala",
      description: "Tem certeza que você deseja encerrar esta sala?",
      cancel: {
        text: 'Cancelar'
      },
      confirm: {
        text: 'Sim, encerrar',
        handle: async () => {
          const endupRoomPromise: Promise<string | Error> = 
            new Promise((resolve, reject) => {
              const roomRef = database.ref(`rooms/${roomId}`);
      
              roomRef.update({
                endedAt: new Date(),
              }).then(() => {
                resolve(`Sala "${title}" foi encerrada com sucesso!`);
              }).catch(err => {
                reject(err);
              })
            });
      
          toast.promise<string | Error>(endupRoomPromise, {
            loading: 'Encerrando sala...',
            success: (data) => {
              history.push("/");
              
              return data.toString();
            },
            error: (err) => err.toString(),
          });
        }
      }
    });
  }

  async function handleDeleteQuestion(id: string) {
    addModal({
      icon: deleteIconImg,
      title: "Excluir pergunta",
      description: "Tem certeza que você deseja excluir esta pergunta?",
      cancel: {
        text: 'Cancelar'
      },
      confirm: {
        text: 'Sim, excluir',
        handle: async () => {
          
          const delateQuestionPromise: Promise<string | Error> = 
            new Promise((resolve, reject) => {
              const roomRef = database.ref(`rooms/${roomId}/questions/${id}`);
      
              roomRef.remove()
                .then(() => {
                  resolve(`Pergunta deletada com sucesso!`);
                }).catch(err => {
                  reject(err);
                })
            });
      
          toast.promise<string | Error>(delateQuestionPromise, {
            loading: 'Deletando pergunta...',
            success: (data) => data.toString(),
            error: (err) => err.toString(),
          });
        }
      }
    });
  }

  async function handleCheckQuestionAsAnswer(id: string) {
    await database.ref(`rooms/${roomId}/questions/${id}`).update({
      isAnswered: true,
      isHighlighted: false,
    });
  }

  async function handleHighlightQuestion(id: string, isHighlight: boolean) {
    if (isHighlight) {
      await database.ref(`rooms/${roomId}/questions/${id}`).update({
        isHighlighted: false,
      });
    } else {
      await database.ref(`rooms/${roomId}/questions/${id}`).update({
        isHighlighted: true,
      });
    }
  }

  return (
    <PageRoom>
      <Header
        roomId={roomId}
        isAdmin
        handleEndRoom={handleEndRoom}
      />

      <Main>
        <RoomTitle>
          <h1>{title}</h1>
          {questions.length !== 0 && (
            <span>{questions.length} pergunta(s)</span>
          )}
        </RoomTitle>

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
                    <>
                      <button
                        className={`${question.isAnswered && "answered"}`}
                        type="button"
                        onClick={() => handleCheckQuestionAsAnswer(question.id)}
                      >
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="12.0003"
                            cy="11.9998"
                            r="9.00375"
                            stroke="#737380"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193"
                            stroke="#737380"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        className={`${question.isHighlighted && "highlighted"}`}
                        type="button"
                        onClick={() =>
                          handleHighlightQuestion(
                            question.id,
                            question.isHighlighted
                          )
                        }
                      >
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z"
                            stroke="#737380"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Deletar pergunta" />
                  </button>
                </Question>
              ))}
            </>
          )}
        </QuestionList>
      </Main>
    </PageRoom>
  );
}