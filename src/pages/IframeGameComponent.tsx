import { useEffect, useState } from "react";

interface GameComponentProps {
  gameUrl?: string;
}

export default function IframeGameComponent({ gameUrl }: GameComponentProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  if (!isValid) {
    return (
      <div
        className="w-full h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[640px] flex items-center justify-center text-gray-400"
        style={{
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        URL do jogo não configurada
      </div>
    );
  }

  useEffect(() => {
    if (!gameUrl) {
      setIsValid(false);
      return;
    }
    const checkUrl = async () => {
      try {
        const res = await fetch(gameUrl, { method: "HEAD" });

        if (res.ok) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch {
        setIsValid(false);
      }
    };
    checkUrl();
  }, [gameUrl]);

  return (
    <div className="w-full flex justify-center overflow-hidden">
      <iframe
        src={gameUrl}
        title="Game"
        className="w-full h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[640px]"
        style={{
          border: "none",
          maxWidth: "100%",
        }}
        allowFullScreen
      ></iframe>
    </div>
  );
}
