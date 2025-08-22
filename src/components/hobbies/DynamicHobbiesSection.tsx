// src/components/hobbies/DynamicHobbiesSection.tsx
'use client';
import dynamic from 'next/dynamic';

const HobbiesPageSection = dynamic(() => import('./HobbiesPageSection'), {
  loading: () => (
    <div className="hobbies-section">
      <div className="container">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="hobbies-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-card"></div>
          ))}
        </div>
      </div>
    </div>
  )
});

export default function DynamicHobbiesSection() {
  return <HobbiesPageSection />;
}