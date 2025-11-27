interface GameComponentProps {
  gameUrl?: string;
}

export default function IframeGameComponent({gameUrl}: GameComponentProps) {
  if (!gameUrl) {
    return (
      <div
        style={{
          width: 910,
          height: 640,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9CA3AF",
        }}
      >
        URL do jogo não configurada
      </div>
    );
  }

  return (
    <iframe
      width={910}
      height={640}
      src={gameUrl}
      title="Game"
      style={{ border: "none" }}
      allowFullScreen
    ></iframe>
  );
}
