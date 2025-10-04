'use client';

import { useEffect, useState } from 'react';
import { api, Work } from '../lib/api';

interface WorksProps {
  works?: Work[];
  loading?: boolean;
}

export default function Works({ works: propWorks, loading: propLoading }: WorksProps) {
  const [works, setWorks] = useState<Work[]>(propWorks || []);
  const [loading, setLoading] = useState(propLoading ?? true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (propWorks !== undefined) {
      setWorks(propWorks);
      setLoading(propLoading ?? false);
      return;
    }

    const fetchWorks = async () => {
      try {
        setLoading(true);
        const worksData = await api.getWorks();
        setWorks(worksData);
      } catch (error) {
        console.error('Error fetching works:', error);
        setWorks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, [propWorks, propLoading]);

  if (!isClient) {
    return (
      <section id="works" className="py-8 xs:py-12 sm:py-16 md:py-20 style={{backgroundColor: '#E7DFD9'}}">
        <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-2xl text-gray-400">...</p>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section id="works" className="py-8 xs:py-12 sm:py-16 md:py-20 style={{backgroundColor: '#E7DFD9'}}">
        <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-2xl text-gray-400">...</p>
          </div>
        </div>
      </section>
    );
  }

  const worksArray = Array.isArray(works) ? works : [];
  
  if (!worksArray || worksArray.length === 0) {
    return (
      <section id="works" className="py-8 xs:py-12 sm:py-16 md:py-20 style={{backgroundColor: '#E7DFD9'}}">
        <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
          <div className="mb-8 xs:mb-12 sm:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-black mb-8 xs:mb-12 sm:mb-16">
              Works
            </h2>
          </div>
          <div className="text-center">
            <p className="text-sm xs:text-base sm:text-lg text-gray-600">No works available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="works" className="py-8 xs:py-12 sm:py-16 md:py-20 style={{backgroundColor: '#E7DFD9'}}">
      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
        <div className="mb-8 xs:mb-12 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-black mb-8 xs:mb-12 sm:mb-16">
            Works
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
          {worksArray.map((work) => {
            const imageUrl = work.image || work.image_url;
            
            return (
              <div key={work.id}  className="rounded-2xl overflow-hidden shadow-lg">
                {imageUrl ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/storage/${imageUrl}`}
                    alt={work.title || `Work ${work.id}`}
                    className="w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
                  />
                ) : (
                  <div style={{backgroundColor: '#E7DFD9'}} className="w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 flex items-center justify-center">
                    <img
                      src="/Vector.svg"
                      alt="No Image Available"
                      className="w-8 h-8"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
