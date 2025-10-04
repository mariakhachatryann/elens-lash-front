'use client';

import Image from 'next/image';
import { Abhaya_Libre } from 'next/font/google';

const abhaya = Abhaya_Libre({ subsets: ['latin'], weight: '800' });

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden flex items-center  min-h-[70vh] xs:min-h-[75vh] sm:min-h-[80vh]" style={{backgroundColor: '#E7DFD9'}}>
      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
          <div className="space-y-4 xs:space-y-6 sm:space-y-8 lg:space-y-12 text-center lg:text-left">
            <div className={`space-y-1 ${abhaya.className}`}>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                PERFECT LASHES
              </h1>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                & BROWS FOR
              </h2>
              <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{color: '#635D56'}}>
                YOUR PERFECT
              </h3>
              <h4 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{color: '#635D56'}}>
                LOOK
              </h4>
            </div>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="px-3 xs:px-4 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm sm:text-base md:text-lg font-medium transition-colors rounded-lg cursor-pointer" 
              style={{backgroundColor: '#635D56', color: '#E7DFD9'}}
            >
              <a href='/'>
                BOOK NOW
              </a>
            </button>
          </div>

          <div className="relative flex justify-center lg:justify-end mt-4 xs:mt-6 sm:mt-8 lg:mt-0">
            <div className="relative w-[300px] h-[420px] xs:w-[320px] xs:h-[460px] sm:w-[400px] sm:h-[560px] md:w-[480px] md:h-[640px] lg:w-[500px] lg:h-[650px] xl:w-[600px] xl:h-[730px]">
              <div className="pointer-events-none absolute inset-1 xs:inset-2 sm:inset-3 md:inset-4 lg:inset-5 xl:inset-7 -translate-x-0.5 xs:-translate-x-1 sm:-translate-x-2 md:-translate-x-3 lg:-translate-x-4 translate-y-2 xs:translate-y-3 sm:translate-y-4 md:translate-y-5 lg:translate-y-6 xl:translate-y-7 border border-gray-600" style={{borderRadius: '50%'}}></div>

              <div className="absolute top-[12%] left-[6%] xs:top-[13%] xs:left-[7%] sm:top-[14%] sm:left-[8%] md:top-[15%] md:left-[10%] lg:top-[15%] lg:left-[12%] w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16">
                <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_63_1394)">
                    <path d="M33.59 0.513351V30.8058V66.6815" stroke="#635D56" strokeWidth="4.12423" strokeMiterlimit="10"/>
                    <path d="M66.6769 33.5948H36.3844H0.508728" stroke="#635D56" strokeWidth="4.12423" strokeMiterlimit="10"/>
                    <path d="M56.9848 10.2053L35.5646 31.6204L10.2006 56.9896" stroke="#635D56" strokeWidth="4.12423" strokeMiterlimit="10"/>
                    <path d="M56.9848 56.9896L35.5646 35.5693L10.2006 10.2053" stroke="#635D56" strokeWidth="4.12423" strokeMiterlimit="10"/>
                    <path d="M63.8516 46.9676L36.1471 34.7238L3.32849 20.2272" stroke="#635D56" strokeWidth="4.12423" strokeMiterlimit="10"/>
                    <path d="M20.2224 63.8564L32.4662 36.1519L46.9629 3.3333" stroke="#635D56" strokeWidth="4.12423" strokeMiterlimit="10"/>
                    <path d="M64.2642 21.2015L36.1833 32.5483L2.92139 45.9933" stroke="#635D56" strokeWidth="4.12423" strokeMiterlimit="10"/>
                    <path d="M45.9886 64.2688L34.6367 36.188L21.1968 2.92603" stroke="#635D56" strokeWidth="4.12423" strokeMiterlimit="10"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_63_1394">
                      <rect width="66.1681" height="66.1681" fill="white" transform="translate(0.508789 0.513367)"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/hero.png"
                  alt="Professional model with perfect lashes and brows"
                  width={600}
                  height={730}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
