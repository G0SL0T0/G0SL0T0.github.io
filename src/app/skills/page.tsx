// src/app/skills/page.tsx
'use client';
import '@/styles/skills.css';
import SkillsSection from '@/components/SkillsSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsTab from '@/components/NewsTab';
import ScrollToTop from '@/components/ScrollToTop';
import StubbornButton from '@/components/StubbornButton';

export default function SkillsPage() {
  return (
    <div>
      <Header />
      <main>
        <SkillsSection />
      </main>
      <Footer />
      <NewsTab />
      <StubbornButton />
      <ScrollToTop />
    </div>
  );
}
