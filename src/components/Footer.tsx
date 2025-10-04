'use client';

import { useEffect, useState } from 'react';
import { api, Contact, getContactLogoUrl } from '../lib/api';

interface FooterProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const contactsData = await api.getContacts();
        setContacts(contactsData);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const contact = contacts.length > 0 ? contacts[0] : null;
  const logoUrl = getContactLogoUrl(contact?.logo);
  
  return (
    <footer className="py-6 xs:py-8 sm:py-10" style={{backgroundColor: '#5C5956'}}>
      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col lg:flex-row justify-start gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
           <div className="w-full sm:w-auto">
             <h4 className="text-white font-semibold text-sm sm:text-base">Quick Links</h4>
             <div className="my-2 flex items-center gap-1">
               <div className="w-4 sm:w-6 h-0.5 bg-white"></div>
               <div className="w-6 sm:w-10 h-0.5 bg-white"></div>
             </div>
             <div className="space-y-2 sm:space-y-3">
               {[
                 { id: 'services', label: 'Services' },
                 { id: 'classes', label: 'Classes' },
                 { id: 'works', label: 'Works' }
               ].map((item) => (
                 <button
                   key={item.id}
                   onClick={() => scrollToSection(item.id)}
                   className="block text-white/90 hover:text-white transition-colors text-left text-xs xs:text-sm"
                 >
                   {item.label}
                 </button>
               ))}
             </div>
           </div>
           <div className="w-full sm:w-auto">
             <h4 className="text-white font-semibold text-sm sm:text-base">Contact Us</h4>
             <div className="my-2 flex items-center gap-1">
               <div className="w-4 sm:w-6 h-0.5 bg-white"></div>
               <div className="w-6 sm:w-10 h-0.5 bg-white"></div>
             </div>
             <div className="space-y-3 sm:space-y-4 text-white/90 text-xs sm:text-sm">
               <div>
                 <div className="flex items-center gap-1">
                   <svg className="w-3 xs:w-4 h-3 xs:h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                     <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                   </svg>
                   <span>Address</span>
                 </div>
                 <div className="mt-1 text-xs xs:text-sm">
                   {loading ? '...' : (contact?.address || '12121 Magnolia Blvd, Valley Village, CA 91607')}
                 </div>
               </div>
               <div>
                 <div className="flex items-center gap-1">
                   <svg className="w-3 xs:w-4 h-3 xs:h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                     <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                   </svg>
                   <span>Phone Number</span>
                 </div>
                 <div className="mt-1 text-xs xs:text-sm">
                   {loading ? '...' : (contact?.phone || '747-203-4380')}
                 </div>
               </div>
             </div>
           </div>

           <div className="w-full sm:w-auto">
             <h4 className="text-white font-semibold text-sm sm:text-base">Follow Us</h4>
             <div className="my-2 flex items-center gap-1">
               <div className="w-4 sm:w-6 h-0.5 bg-white"></div>
               <div className="w-6 sm:w-10 h-0.5 bg-white"></div>
             </div>
             <div className="text-white/90 text-xs sm:text-sm space-y-2">
               {loading ? (
                 <div>...</div>
               ) : (
                 <>
                   {contact?.social_links && Object.entries(contact.social_links).map(([platform, url]) => (
                     <a 
                       key={platform}
                       href={url}
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block hover:text-white transition-colors capitalize"
                     >
                       {platform}
                     </a>
                   ))}
                   {(!contact?.social_links || Object.keys(contact.social_links).length === 0) && (
                     <a 
                       href="https://instagram.com" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block hover:text-white transition-colors"
                     >
                       Instagram
                     </a>
                   )}
                 </>
               )}
             </div>
           </div>

            <div className="w-full sm:w-auto">
              <h4 className="text-white font-semibold text-sm sm:text-base">Legal</h4>
              <div className="my-2 flex items-center gap-1">
                <div className="w-4 sm:w-6 h-0.5 bg-white"></div>
                <div className="w-6 sm:w-10 h-0.5 bg-white"></div>
              </div>
              <div className="text-white/90 text-xs sm:text-sm space-y-2">
                <a href="/" className="block hover:text-white transition-colors">Privacy Policy</a>
              </div>
            </div>

            {logoUrl && (
              <div className="hidden lg:flex items-start justify-end lg:ml-auto mt-6 lg:mt-10">
                <img 
                  src={logoUrl} 
                  alt="Logo" 
                  className="h-6 sm:h-8 md:h-9 lg:h-10 xl:h-12 object-contain"
                />
              </div>
            )}
         </div>
         {logoUrl && (
           <div className="flex justify-center lg:hidden mt-6">
             <img 
               src={logoUrl} 
               alt="Logo" 
               className="h-8 sm:h-10 md:h-12 object-contain"
             />
           </div>
         )}
         <div className="mt-4 xs:mt-6 pt-3 xs:pt-4 text-center text-white/90 text-xs xs:text-sm">
           <p>© All Rights Reserved</p>
         </div>
      </div>
    </footer>
  );
}
