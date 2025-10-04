'use client';

import { useEffect } from 'react';
import { api, getContactLogoUrl, Contact } from '@/lib/api';

export default function DynamicFavicon() {
  useEffect(() => {
    const updateFavicon = async () => {
      try {
        const contacts = await api.getContacts();
        const contact = contacts.length > 0 ? contacts[0] : null;
        const logoUrl = getContactLogoUrl(contact?.logo);
        
        if (logoUrl) {
          const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
          link.type = 'image/x-icon';
          link.rel = 'shortcut icon';
          link.href = logoUrl;
          
          if (!document.querySelector("link[rel*='icon']")) {
            document.getElementsByTagName('head')[0].appendChild(link);
          }
        }
      } catch (error) {
        console.error('Error updating favicon:', error);
      }
    };

    updateFavicon();
  }, []);

  return null;
}
