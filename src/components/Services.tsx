'use client';

import Link from 'next/link';
import ServiceCard from './ServiceCard';
import { Service } from '../lib/api';
import { useEffect, useState } from 'react';

interface ServicesProps {
  services: Service[];
  loading: boolean;
  showAll?: boolean;
  linkItems?: boolean;
}

export default function Services({ services, loading, showAll = false, linkItems = false }: ServicesProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section id="services" className="min-h-screen flex items-center bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-2xl text-gray-400">...</p>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section id="services" className="min-h-screen flex items-center bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-2xl text-gray-400">...</p>
          </div>
        </div>
      </section>
    );
  }

  const servicesArray = Array.isArray(services) ? services : [];
  
  if (!servicesArray || servicesArray.length === 0) {
    return (
      <section id="services" className="py-8 xs:py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
          <div className="mb-8 xs:mb-12 sm:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-black mb-8 xs:mb-12 sm:mb-16">
              Services
            </h2>
          </div>
          <div className="text-center">
            <p className="text-sm xs:text-base sm:text-lg text-gray-600">No services available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  const displayedServices = showAll ? servicesArray : servicesArray.slice(0, 3);

  return (
    <section id="services" className="py-8 xs:py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
        <div className="mb-8 xs:mb-12 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-black mb-8 xs:mb-12 sm:mb-16">
            Services
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 mb-15">
          {displayedServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title || service.name || ''}
              description={service.description}
              price={service.price}
              image={(service as any).image || service.image_url}
              href={linkItems ? `/services/${service.id}` : undefined}
              showActions={false}
            />
          ))}
        </div>
        {!showAll && servicesArray.length > 3 && (
          <div className="text-center mt-8 xs:mt-10 sm:mt-12">
            <Link 
              href="/services"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer inline-block px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm sm:text-base font-semibold rounded-lg transition-colors hover:opacity-90" 
              style={{backgroundColor: '#635D56', color: '#E7DFD9'}}
            >
              VIEW ALL
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
