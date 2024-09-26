import Header from '../components/Header';
import { AuroraHero } from '../components/Hero';
import { RevealBento } from '../components/RevealBento';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', minHeight: '100vh', background: 'linear-gradient(to bottom, #000000, #1a1a2e)' }}>
      <AuroraHero />
      <RevealBento />
    </div>
  );
}
