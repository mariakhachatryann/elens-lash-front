'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api, Service } from '../../../lib/api';
import Navigation from '../../../components/Navigation';
import ServiceCard from '../../../components/ServiceCard';
import Footer from '../../../components/Footer';

export default function ServiceDetailPage() {
  const params = useParams();
  const idParam = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const serviceId = Number(idParam);

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!serviceId || Number.isNaN(serviceId)) {
      console.warn('[ServiceDetail] Invalid or missing serviceId');
      return;
    }
    const load = async () => {
      try {
        setLoading(true);
        const data = await api.getService(serviceId);
        setService(data.data);
      } catch (err) {
        console.error('[ServiceDetail] Error fetching service:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [serviceId]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
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
          {!loading && !service && (
            <p className="text-gray-500">Service not found.</p>
          )}
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
                      price={child.price}
                      image={child.image as string | undefined}
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


