// src/components/hobbies/DynamicHobbiesComponents.tsx
'use client';
import dynamic from 'next/dynamic';

// Динамически импортируем компоненты только на клиенте
const NewsTab = dynamic(() => import('@/components/NewsTab'), {
  loading: () => <div className="loading-placeholder">Загрузка новостей...</div>,
  ssr: false
});

const StubbornButton = dynamic(() => import('@/components/StubbornButton'), {
  loading: () => null,
  ssr: false
});

const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), {
  loading: () => null,
  ssr: false
});

export default function DynamicHobbiesComponents() {
  return (
    <>
      <NewsTab />
      <StubbornButton />
      <ScrollToTop />
    </>
  );
}