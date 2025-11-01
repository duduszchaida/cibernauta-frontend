export default function GameComponent() {
  const gameScale = 2;
  return (
    <iframe
      width={352 * gameScale}
      height={256 * gameScale}
      src="https://bruno-rubim.github.io/email_game_test/"
    ></iframe>
  );
}
