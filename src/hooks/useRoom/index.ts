import { useEffect, useState } from 'react';

import { database } from '../../services/firebase';

import { QuestionProps } from './types';
import { recoveryQuestions } from '../../utils/recoveryQuestions';
import { useAuth } from '../useAuth';

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    const userId = user?.id;

    // TODO: fazer uma verificação mais profunda, para saber quais items foram
    // alterados.
    roomRef.on('value', (room) => {
      const data = recoveryQuestions(room, userId);

      setTitle(data.title);
      setQuestions(data.questions);
    });

    return () => {
      roomRef.off("value");
    };
  }, [roomId, user?.id]);

  return {
    questions,
    title
  }
}