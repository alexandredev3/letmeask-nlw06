import { useState, useEffect, createContext } from 'react';

import { firebase, auth } from '../../services/firebase';

import { AuthContextProps, AuthProviderProps, User } from './types';

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