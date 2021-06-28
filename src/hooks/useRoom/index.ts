import { useEffect, useState } from 'react';

import { database } from '../../services/firebase';

import { QuestionProps } from './types';
import { retrieveRoomData } from '../../utils/retrieveRoomData';
import { useAuth } from '../useAuth';

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCurrentUserRoomAdmin, setIsCurrentUserRoomAdmin] = useState(false);
  const [roomExists, setRoomExists] = useState(false);

  useEffect(() => {
    (async () => {
      const roomRef = database.ref(`rooms/${roomId}`);
      const userId = user?.id;
  
      setRoomExists((await roomRef.get()).exists())
  
      // TODO: fazer uma verificação mais profunda, para saber quais items foram
      // alterados.
      roomRef.on('value', (room) => {
        const data = retrieveRoomData(room, userId);
        const isCurrentUserRoomAdmin = data.authorId === user?.id;

        setIsCurrentUserRoomAdmin(isCurrentUserRoomAdmin);
        setTitle(data.title);
        setQuestions(data.questions);
        setIsLoading(false);
      });
  
      return () => {
        roomRef.off("value");
      };
    })()
  }, [roomId, user?.id]);

  return {
    questions,
    title,
    roomExists,
    isCurrentUserRoomAdmin,
    isLoading
  }
}