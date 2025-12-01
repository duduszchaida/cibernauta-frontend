import { useEffect, useRef, type CSSProperties } from "react";
import { startGame } from "./EmailGame/GameManager";

interface EmailGameComponentProps {
  leaderboardUpdate: () => Promise<void>;
}

export default function EmailGameComponent({
  leaderboardUpdate,
}: EmailGameComponentProps) {
  const canvasStyle: CSSProperties = {
    cursor: "none",
    imageRendering: "pixelated",
    border: "none",
    outline: "none",
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStarted = useRef(false);

  useEffect(() => {
    if (canvasRef.current && !gameStarted.current) {
      gameStarted.current = true;
      startGame(canvasRef.current, gameScale, leaderboardUpdate);
    }
  }, []);

  let gameScale = 3;
  if (innerWidth < 1700 || innerHeight < 900) {
    gameScale = 2;
  }
  console.log(innerWidth, gameScale);

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
      <canvas ref={canvasRef} style={canvasStyle} tabIndex={0} />
    </div>
  );
}
