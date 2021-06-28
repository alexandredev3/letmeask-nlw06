import { firebase } from '../services/firebase';
import { QuestionProps } from '../hooks/useRoom/types';

type FirebaseQuestion = Record<string, Omit<QuestionProps, 'id'> & {
  likes: Record<string, {
    authorId: string;
  }>
}>

type FirebaseRoom = {
  authorId: string;
  title: string;
}

type Response = FirebaseRoom & {
  questions: QuestionProps[];
}

export function retrieveRoomData(room: firebase.database.DataSnapshot, userId: string | undefined): Response 
{
  const databaseRoom = room.val();
  const firebaseQuestions: FirebaseQuestion = databaseRoom.questions ?? {};

  const parsedQuestions = 
    Object.entries(firebaseQuestions).map(([ key, value ]): QuestionProps => {

    return {
      id: key,
      content: value.content,
      author: value.author,
      isHighlighted: value.isHighlighted,
      isAnswered: value.isAnswered,
      likesCount: 
        Object
          .values(value.likes ?? {}).length, // [{ authorId: string }]
      likeId: 
        Object
          .entries(value.likes ?? {})
          .find(([ key, value ]) => value?.authorId === userId )?.[0] // [string, {authorId: string}]
    }
  });

  return {
    authorId: databaseRoom.authorId,
    title: databaseRoom.title,
    questions: parsedQuestions
  };
}
