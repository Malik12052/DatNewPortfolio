import Header from '../components/Header';
import { AuroraHero } from '../components/Hero';
import { RevealBento } from '../components/RevealBento';
import Skills from './skills';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', minHeight: '100vh' }}>
      <AuroraHero />
      <RevealBento />
      <Skills />
    </div>
  );
}
