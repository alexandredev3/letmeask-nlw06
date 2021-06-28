import logoImg from '../../assets/images/logo.svg';

import { Button } from '../Button';
import { RoomCode } from '../RoomCode';

import { Container, Content } from './styles';

type HeaderProps = {
  roomId: string;
  isAdmin?: boolean;
  handleEndRoom?: () => Promise<void>; 
}

export function Header({
  roomId,
  isAdmin = false,
  handleEndRoom
}: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Letmeask logo" />
        <div>
          <RoomCode code={roomId} />
          {isAdmin && (
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          )}
        </div>
      </Content>
    </Container>
  );
}