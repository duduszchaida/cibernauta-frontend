interface GameComponentProps {
  gameUrl?: string;
}

export default function GameComponent({ gameUrl }: GameComponentProps) {
  const gameScale = 2;

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