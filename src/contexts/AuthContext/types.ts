import { ReactNode } from "react"

export type AuthProviderProps = {
  children: ReactNode;
}

export type User = {
  id: string;
  name: string;
  avatar_url: string;
}

export type AuthContextProps = {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
}