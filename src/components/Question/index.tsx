import { ReactNode } from 'react';

import { 
  Container,
  Footer,
  UserInfo,
} from './styles';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar_url: string;
  }
  children: ReactNode;
}

export function Question({ content, author, children }: QuestionProps) {
  return (
    <Container>
      <p>{content}</p>
      <Footer>
        <UserInfo>
          <img src={author.avatar_url} alt={author.name} />
          <span>{author.name}</span>
        </UserInfo>
        <div>
          {children}
        </div>
      </Footer>
    </Container>
  );
}