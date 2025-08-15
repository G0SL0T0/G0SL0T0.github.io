// src/app/page.tsx
'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsPreview from '@/components/SkillsPreview';
import LatestProjectSection from '@/components/LatestProjectSection';
import CasesSection from '@/components/CasesSection';
import Footer from '@/components/Footer';
import NewsTab from '@/components/NewsTab';
import StubbornButton from '@/components/StubbornButton';
import PixelEcosystemWrapper from '@/components/PixelEcosystemWrapper';

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsPreview />
        <LatestProjectSection />
        <CasesSection />
        <PixelEcosystemWrapper />
      </main>
      <Footer />
      <NewsTab />
      <StubbornButton />
    </div>
  );
}
