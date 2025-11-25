import { useEffect, useRef, type CSSProperties } from "react";
import { startGame } from "./EmailGame/GameManager";
import type GameState from "./EmailGame/GameState";

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
  const gameStateRef = useRef<GameState | null>(null);

  useEffect(() => {
    if (canvasRef.current && !gameStarted.current) {
      gameStarted.current = true;

      const gameState = startGame(canvasRef.current);
      gameStateRef.current = gameState;
    }
  }, [onScoreUpdate]);

  const gameScale = 2;

  return (
    <div
      style={{
        width: 426 * gameScale,
        height: 286 * gameScale,
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
