import { useEffect, useRef, type CSSProperties } from "react";
import { startGame } from "./EmailGame/GameManager";

interface EmailGameComponentProps {
  onScoreUpdate?: (score: number) => void;
  gameId: number;
  userId?: number;
}

export default function EmailGameComponent({
  onScoreUpdate,
}: EmailGameComponentProps) {
  const canvasStyle: CSSProperties = {
    cursor: "none",
    imageRendering: "pixelated",
    border: "none",
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStarted = useRef(false);

  useEffect(() => {
    if (canvasRef.current && !gameStarted.current) {
      gameStarted.current = true;
      startGame(canvasRef.current);
    }
  }, [onScoreUpdate]);

  const gameScale = 2;

  return (
    <div
      style={{
        width: 352 * gameScale,
        height: 256 * gameScale,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
      }}
    >
      <canvas ref={canvasRef} style={canvasStyle} />
    </div>
  );
}
