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
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children
}: QuestionProps) {
  return (
    <Container
      isAnswered={isAnswered}
      isHighlighted={isHighlighted}
    >
      <p>{content}</p>
      <Footer>
        <UserInfo className="user-info">
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