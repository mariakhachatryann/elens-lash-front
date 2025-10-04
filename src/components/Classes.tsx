'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, Course } from '../lib/api';
import ClassCard from './ClassCard';

export default function Classes({ forceShowAll = false }: { forceShowAll?: boolean }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await api.getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (!isClient) {
    return (
      <section id="classes" className="py-10" style={{backgroundColor: '#E7DFD9'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center justify-center">
          <p className="text-2xl text-gray-400">...</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section id="classes" className="py-10" style={{backgroundColor: '#E7DFD9'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center justify-center">
          <p className="text-2xl text-gray-400">...</p>
        </div>
      </section>
    );
  }

  const displayedCourses = forceShowAll ? courses : courses.slice(0, 3);

  return (
    <section id="classes" className="py-6 xs:py-8 sm:py-10" style={{backgroundColor: '#E7DFD9'}}>
      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
        <div className="mb-8 xs:mb-12 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-black mb-8 xs:mb-12 sm:mb-16">
            Classes
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 mb-12">
          {displayedCourses.length > 0 ? (
            displayedCourses.map((course) => (
              <ClassCard
                key={course.id}
                title={course.title}
                description={course.description}
                price={course.price}
              />
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-sm xs:text-base sm:text-lg text-gray-600">No classes available at the moment.</p>
            </div>
          )}
        </div>
        {!forceShowAll && courses.length > 3 && (
          <div className="text-center mt-8 xs:mt-10 sm:mt-12">
            <Link 
              href="/classes"
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
