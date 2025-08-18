// src/app/projects/page.tsx
'use client';

import ProjectsPageSection from '@/components/projects/ProjectsPageSection';
import '@/styles/projects.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsTab from '@/components/NewsTab';
import StubbornButton from '@/components/StubbornButton';
import ScrollToTop from '@/components/ScrollToTop';

export default function ProjectsPage() {
  return (
    <div>
      <Header />
      <main>
        <ProjectsPageSection />
      </main>
      <Footer />
      <NewsTab />
      <StubbornButton />
      <ScrollToTop />
    </div>
  );
}