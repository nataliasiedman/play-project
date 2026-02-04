import Feature from "./components/Feature";
import HeroCarousel from "./components/HeroCarousel";

export default function Home() {
  return (
    <main className="bg-transparent">
      <HeroCarousel />
      <Feature />
    </main>
  );
}
