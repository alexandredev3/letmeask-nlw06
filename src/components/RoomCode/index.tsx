import copyImg from '../../assets/images/copy.svg'; 

import { Container } from './styles';

type RoomCodeProps = {
  code: string;
}

export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeOnClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <Container onClick={copyRoomCodeOnClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>

      <span>Sala #{code}</span>
    </Container>
  );
}