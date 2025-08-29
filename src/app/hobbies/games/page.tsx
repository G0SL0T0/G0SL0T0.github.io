// src/app/hobbies/games/page.tsx
'use client';

import { useState, useEffect } from 'react';
import GamesPage from '@/components/games/GamesPage';
import GameStatsSection from '@/components/games/GameStatsSection';
import TopGamesSection from '@/components/games/TopGamesSection';
import CurrentGamesSection from '@/components/games/CurrentGamesSection';
import SteamGamesSection from '@/components/games/SteamGamesSection';
import GamesSidebar from '@/components/games/GamesSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsTab from '@/components/NewsTab';
import StubbornButton from '@/components/StubbornButton';
import '@/styles/hobbies.css';
import '@/styles/games.css';
import '@/styles/hobbies-games.css';
import '@/styles/hobby-game-card.css';
import '@/styles/enhanced-hobbies.css';
export default function HobbiesGamesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <GamesPage>
        <GameStatsSection />
        <TopGamesSection />
        <CurrentGamesSection />
        <SteamGamesSection />
        <GamesSidebar />
      </GamesPage>
      <Footer />
      <NewsTab />
      <StubbornButton />
    </div>
  );
}