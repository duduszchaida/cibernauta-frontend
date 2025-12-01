import { useEffect, useRef, useState, type CSSProperties } from "react";
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
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
  };
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameStarted = useRef(false);
  const [gameScale, setGameScale] = useState(3);

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      const baseWidth = 352;
      const baseHeight = 256;
      
      // Calcula a escala que cabe no container mantendo proporção
      const scaleX = Math.floor(containerWidth / baseWidth);
      const scaleY = Math.floor(containerHeight / baseHeight);
      
      // Usa a menor escala para garantir que cabe
      const newScale = Math.max(1, Math.min(scaleX, scaleY, 3));
      
      setGameScale(newScale);
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  useEffect(() => {
    if (canvasRef.current && !gameStarted.current && gameScale > 0) {
      gameStarted.current = true;
      startGame(canvasRef.current, gameScale, leaderboardUpdate);
    }
  }, [gameScale, leaderboardUpdate]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "256px",
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