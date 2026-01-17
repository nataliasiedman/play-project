import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>English Uno Game</h1>
      <p>Meu primeiro jogo para aprender inglês</p>

      <Link href="/game">
        <button style={{ marginTop: 20 }}>
          🎮 Começar o jogo
        </button>
      </Link>
    </div>
  );
}
