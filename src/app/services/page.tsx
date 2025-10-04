'use client';

import { useEffect, useState } from 'react';
import { api, Service } from '../../lib/api';
import Navigation from '../../components/Navigation';
import Services from '../../components/Services';
import Footer from '../../components/Footer';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await api.getServices();
        setServices(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isClient) {
    return (
      <div className="min-h-screen">
        <Navigation scrollToSection={scrollToSection} />
        <main className="min-h-screen flex items-center bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-2xl text-gray-400">...</p>
            </div>
          </div>
        </main>
        <Footer scrollToSection={scrollToSection} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation scrollToSection={scrollToSection} />
      <main>
        <Services services={services} loading={loading} showAll linkItems />
      </main>
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}


