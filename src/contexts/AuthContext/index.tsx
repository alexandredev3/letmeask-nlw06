import { useState } from 'react';
import { useEffect } from 'react';
import { ReactNode } from 'react';
import { createContext } from 'react';

import { firebase, auth } from '../../services/firebase'; 

type AuthProviderProps = {
  children: ReactNode;
}

type User = {
  id: string;
  name: string;
  avatar_url: string;
}

type AuthContextProps = {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  function recoveryUserCredentials(user: firebase.User) {
    const { displayName, photoURL, uid } = user;

    if (!displayName || !photoURL) {
      throw new Error('Missing information from Google Account');
    }

    setUser({
      id: uid,
      name: displayName,
      avatar_url: photoURL,
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        recoveryUserCredentials(user);
      }
    })

    // sempre precisamos desfazer dos events linisters no useEffect
    // se não, esse evento vai ficar rodando quando o componente não
    // estiver em tela(uma boa pratica no useEffect).
    return () => {
      unsubscribe();
    }
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider(); 

    try {
      const result = await auth.signInWithPopup(provider);

      if (result.user) {
        recoveryUserCredentials(result.user);
      }

    } catch(err) {
      alert(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle
      }}
    >
     {children}
    </AuthContext.Provider>
  );
}

export {
  AuthContext,
  AuthProvider
}