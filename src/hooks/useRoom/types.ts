export type QuestionProps = {
  id: string;
  author: {
    name: string;
    avatar_url: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likesCount: number;
  likeId: string | undefined;
}