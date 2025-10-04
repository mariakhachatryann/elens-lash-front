'use client';

import Navigation from '../../components/Navigation';
import Classes from '../../components/Classes';
import Footer from '../../components/Footer';

export default function ClassesPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navigation scrollToSection={scrollToSection} />
      <main>
        <Classes forceShowAll />
      </main>
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}


