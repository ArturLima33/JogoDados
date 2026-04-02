import { useState, useEffect } from 'react';

export default function Dado({ valor, girando }) {
  const [cor, setCor] = useState('');
  const cores = ['#FF5555', '#55FF55', '#5555FF', '#FFFF55', '#FF55FF', '#55FFFF', '#FF9900', '#CC00FF'];

  useEffect(() => {
    if (cor === '' || girando) {
      const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
      setCor(corAleatoria);
    }
  }, [girando, cor]);

  const pontos = {
    1: [[60, 60]],
    2: [[40, 40], [80, 80]],
    3: [[40, 40], [60, 60], [80, 80]],
    4: [[40, 40], [40, 80], [80, 40], [80, 80]],
    5: [[40, 40], [40, 80], [60, 60], [80, 40], [80, 80]],
    6: [[40, 40], [40, 60], [40, 80], [80, 40], [80, 60], [80, 80]],
  };

  return (
    <div className={`relative w-24 h-24 ${girando ? 'animate-bounce' : ''}`}>
      <svg viewBox="0 0 120 120" className={girando ? 'animate-spin' : ''} style={{ animationDuration: '0.3s' }}>
        <path d="M100 20 L120 10 L120 90 L100 100 Z" fill={cor} filter="brightness(0.5)" stroke="black" strokeWidth="2"/>
        <path d="M20 20 L40 10 L120 10 L100 20 Z" fill={cor} filter="brightness(0.7)" stroke="black" strokeWidth="2"/>
        <rect x="20" y="20" width="80" height="80" rx="8" fill={cor || '#ffffff'} stroke="black" strokeWidth="2" />
        {!girando && valor > 0 && pontos[valor]?.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill="black" />
        ))}
      </svg>
    </div>
  );
}