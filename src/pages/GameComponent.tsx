import { useRef, useState } from "react";
import { startGame } from "./EmailGame/GameManager";

type GameProperties = {
  width: number;
  height: number;
};

export default function GameComponent(prop: GameProperties) {
  const [initialized, setInitialized] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasDom = canvasRef.current;
  const canvasStyle = {
    cursor: "none",
  };
  if (!initialized && canvasDom) {
    console.log("initializing");
    startGame(canvasDom);
    setInitialized(true);
  }
  return (
    <canvas
      ref={canvasRef}
      width={prop.width}
      height={prop.height}
      style={canvasStyle}
    ></canvas>
  );
}
