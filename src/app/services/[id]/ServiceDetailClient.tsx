'use client';

import React, { useEffect, useState } from 'react';
import { api, Service } from '../../../lib/api';
import Navigation from '../../../components/Navigation';
import ServiceCard from '../../../components/ServiceCard';
import Footer from '../../../components/Footer';

export default function ServiceDetailClient({ id }: { id: number }) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!Number.isFinite(id)) return;
    (async () => {
      try {
        setLoading(true);
        const resp = await api.getService(id);
        setService(resp.data);
      } catch (e) {
        console.error('[ServiceDetail] fetch error:', e);
        setService(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isClient) {
    return (
      <div className="min-h-screen">
        <Navigation scrollToSection={scrollToSection} />
        <main className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center justify-center">
            <p className="text-2xl text-gray-400">...</p>
          </div>
        </main>
        <Footer scrollToSection={scrollToSection} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation scrollToSection={scrollToSection} />
      <main className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh]">
          {loading && (
            <div className="min-h-[70vh] flex items-center justify-center">
              <p className="text-2xl text-gray-400">...</p>
            </div>
          )}
          {!loading && !service && <p className="text-gray-500">Service not found.</p>}

          {service && (
            <section className="py-4">
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-black mb-2">
                  {service.title || service.name}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-15">
                {Array.isArray(service.children) && service.children.length > 0 ? (
                  service.children.map((child) => (
                    <ServiceCard
                      key={child.id}
                      title={child.title}
                      description={child.description}
                      price={child.price ?? undefined as unknown as number}
                      image={(child.image ?? undefined) as string | undefined}
                      showActions
                    />
                  ))
                ) : (
                  <p className="text-gray-600">No child services available.</p>
                )}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
