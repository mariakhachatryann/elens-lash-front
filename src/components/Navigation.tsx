'use client';

import { Abhaya_Libre } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const abhaya = Abhaya_Libre({ subsets: ['latin'], weight: '400' });

interface NavigationProps {
  scrollToSection?: (sectionId: string) => void;
}

export default function Navigation({ scrollToSection }: NavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const goTo = (sectionId: string) => {
    if (pathname === '/' && typeof scrollToSection === 'function') {
      scrollToSection(sectionId);
      return;
    }
    router.push(`/#${sectionId}`);
  };

  return (
    <nav className="w-full" style={{backgroundColor: '#E7DFD9'}}>
      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[60px] xs:h-[70px] sm:h-[80px] md:h-[90px]">
          <Link href="/" className={`${abhaya.className} text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800`}>
            Lorem Ipsum logo
          </Link>
          <div className="flex gap-1 xs:gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12">
            <button onClick={() => goTo('hero')} className="text-xs xs:text-sm sm:text-base font-medium text-gray-800 px-1 xs:px-2 py-1 hover:text-gray-600 transition-colors">Home</button>
            <button onClick={() => goTo('services')} className="text-xs xs:text-sm sm:text-base font-medium text-gray-800 px-1 xs:px-2 py-1 hover:text-gray-600 transition-colors">Services</button>
            <button onClick={() => goTo('classes')} className="text-xs xs:text-sm sm:text-base font-medium text-gray-800 px-1 xs:px-2 py-1 hover:text-gray-600 transition-colors">Classes</button>
            <button onClick={() => goTo('works')} className="text-xs xs:text-sm sm:text-base font-medium text-gray-800 px-1 xs:px-2 py-1 hover:text-gray-600 transition-colors">Works</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
