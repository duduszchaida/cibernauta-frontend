import { useEffect, useRef, useState } from "react";

interface GameComponentProps {
  gameUrl?: string;
}
export default function IframeGameComponent({ gameUrl }: GameComponentProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!gameUrl) {
      setIsValid(false);
      return;
    }

    // Start in loading state
    setIsValid(null);

    // Set timeout to detect failure
    timeoutRef.current = setTimeout(() => {
      setIsValid(false);
      timeoutRef.current = null; // meaning timeout fired
    }, 3000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };
  }, [gameUrl]);

  const handleLoad = () => {
    console.log("loaded");
    // Only mark as valid if timeout did NOT fire yet
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setIsValid(true);
    }
  };

  return (
    <>
      {/* Valid iframe */}
      {isValid !== false && (
        <div className="w-full flex justify-center overflow-hidden">
          <iframe
            src={gameUrl}
            title="game"
            onLoad={handleLoad}
            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[640px]"
            style={{ border: "none", maxWidth: "100%" }}
            allowFullScreen
          />
        </div>
      )}

      {/* Invalid URL */}
      {isValid === false && (
        <div
          className="w-full h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[640px] flex items-center justify-center text-gray-400"
          style={{ maxWidth: "100%", margin: "0 auto" }}
        >
          URL do jogo inválida ou indisponível
        </div>
      )}
    </>
  );
}
