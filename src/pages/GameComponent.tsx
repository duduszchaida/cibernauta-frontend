import { useEffect, useRef } from "react";
import { startGame } from "./EmailGame/GameManager";

type GameProperties = {
  width: number;
  height: number;
};

export default function GameComponent(prop: GameProperties) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasStyle = { cursor: "none" };

  useEffect(() => {
    const canvasDom = canvasRef.current;
    if (canvasDom) {
      console.log("initializing");
      startGame(canvasDom);
    }
  }, [canvasRef]);
  return (
    <canvas
      ref={canvasRef}
      width={prop.width}
      height={prop.height}
      style={canvasStyle}
    ></canvas>
  );
}
