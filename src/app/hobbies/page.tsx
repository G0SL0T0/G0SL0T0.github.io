// src/app/hobbies/page.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DynamicHobbiesSection from '@/components/hobbies/DynamicHobbiesSection';
import DynamicHobbiesComponents from '@/components/hobbies/DynamicHobbiesComponents';
import '@/styles/hobbies.css';

export default function HobbiesPage() {
  return (
    <div className="hobbies-page">
      <Header />
      <main>
        <DynamicHobbiesSection />
      </main>
      <DynamicHobbiesComponents />
      <Footer />
    </div>
  );
}