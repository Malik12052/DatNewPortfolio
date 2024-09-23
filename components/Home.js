import { Example } from '../components/Header';
import { AuroraHero } from '../components/Hero';
import RevealBento from '../components/RevealBento';

export default function Home() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Example />
      <AuroraHero />
      <h1></h1>
      <p></p>
      {/* Add the RevealBento component here */}
      <RevealBento />
    </div>
  );
}
