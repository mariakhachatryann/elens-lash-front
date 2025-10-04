'use client';

import { useEffect, useState } from 'react';
import { api, Service, Work } from '../lib/api';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Classes from '../components/Classes';
import Works from '../components/Works';
import Footer from '../components/Footer';

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [works, setWorks] = useState<Work[]>([]);
  const [worksLoading, setWorksLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'classes', 'works'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        const servicesData = await api.getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setWorksLoading(true);
        const worksData = await api.getWorks();
        setWorks(worksData);
      } catch (error) {
        console.error('Error fetching works:', error);
        setWorks([]);
      } finally {
        setWorksLoading(false);
      }
    };

    fetchWorks();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <Services services={services} loading={servicesLoading} linkItems />
      <Classes />
      <Works works={works} loading={worksLoading} />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}