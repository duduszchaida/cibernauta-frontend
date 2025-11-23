import EmailGameComponent from "./EmailGameComponent";

interface GameComponentProps {
  gameUrl?: string;
  gameType?: string;
  gameId: number;
  userId?: number;
  onScoreUpdate?: (score: number) => void;
}

export default function GameComponent({ gameUrl, gameType, gameId, userId, onScoreUpdate }: GameComponentProps) {
  const gameScale = 2;


  if (gameType === 'local') {
    return (
      <EmailGameComponent
        gameId={gameId}
        userId={userId}
        onScoreUpdate={onScoreUpdate}
      />
    );
  }


  if (!gameUrl) {
    return (
      <div
        style={{
          width: 352 * gameScale,
          height: 256 * gameScale,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9CA3AF'
        }}
      >
        URL do jogo não configurada
      </div>
    );
  }

  return (
    <iframe
      width={352 * gameScale}
      height={256 * gameScale}
      src={gameUrl}
      title="Game"
      style={{ border: 'none' }}
      allowFullScreen
    ></iframe>
  );
}