// src/components/PixelEcosystemWrapper.tsx
'use client';
import dynamic from 'next/dynamic';

// Динамически импортируем игру с отключенным SSR
const PixelEcosystem = dynamic(() => import('./PixelEcosystem'), {
  ssr: false,
  loading: () => <div className="text-center py-8">Загрузка игры...</div>
});

export default function PixelEcosystemWrapper() {
  return (
    <div id="pixel-ecosystem-game">
      <PixelEcosystem />
    </div>
  );
}