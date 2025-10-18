export const API_BASE_URL = 'https://api.elenslashlounge.com/api';

export function getServiceImageUrl(image?: string): string | undefined {
  if (!image) return undefined;
  const trimmed = image.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://api.elenslashlounge.com/storage/${trimmed}`;
}

export function getContactLogoUrl(logo?: string): string | undefined {
  if (!logo) return undefined;
  const trimmed = logo.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://api.elenslashlounge.com/storage/${trimmed}`;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  price?: number;
  duration?: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  name?: string;
  title?: string;
  description: string;
  price: string;
  duration_minutes?: number;
  category?: string;
  is_active: boolean;
  image_url?: string;
  image?: string;
  parent_id?: number | null;
  children?: Array<{
    id: number;
    parent_id?: number | null;
    title: string;
    description?: string;
    price?: string;
    image?: string;
    created_at?: string;
    updated_at?: string;
  }>;
  features?: string;
  created_at: string;
  updated_at: string;
}

export interface Work {
  id: number;
  title?: string;
  description?: string;
  image?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: number;
  address: string;
  phone: string;
  logo?: string;
  social_links?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
  };
  created_at: string;
  updated_at: string;
}

function buildDefaultHeaders(): Record<string, string> {
  return { Accept: 'application/json', 'Content-Type': 'application/json' };
}

export const api = {
  async getCourses(): Promise<Course[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/classes`, {
        headers: buildDefaultHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data && typeof data === 'object' && 'data' in data) {
        if (data.data && typeof data.data === 'object' && 'data' in data.data) {
          return data.data.data || [];
        }
        if (Array.isArray(data.data)) {
          return data.data;
        }
      }
      
      if (Array.isArray(data)) {
        return data;
      }
      
      console.warn('Unexpected API response format:', data);
      return [];
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  async getServices(): Promise<Service[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/services`, {
        headers: buildDefaultHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data && typeof data === 'object' && 'data' in data) {
        if (data.data && typeof data.data === 'object' && 'data' in data.data) {
          return data.data.data || [];
        }
        if (Array.isArray(data.data)) {
          return data.data;
        }
      }
      
      if (Array.isArray(data)) {
        return data;
      }
      
      console.warn('Unexpected API response format:', data);
      return [];
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  async getService(id: number): Promise<{ data: Service }> {
    try {
      const response = await fetch(`${API_BASE_URL}/services/${id}`, {
        headers: buildDefaultHeaders(),
      });
      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        throw new Error(`HTTP error! status: ${response.status}${errText ? ` - ${errText}` : ''}`);
      }
      const raw = await response.json();
      const serviceData = (raw && typeof raw === 'object' && 'data' in raw) ? (raw as any).data : raw;
      return { data: serviceData as Service };
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      throw error;
    }
  },

  async getWorks(): Promise<Work[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/works`, {
        headers: buildDefaultHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data && typeof data === 'object' && 'data' in data) {
        if (data.data && typeof data.data === 'object' && 'data' in data.data) {
          return data.data.data || [];
        }
        if (Array.isArray(data.data)) {
          return data.data;
        }
      }
      
      if (Array.isArray(data)) {
        return data;
      }
      
      console.warn('Unexpected API response format:', data);
      return [];
    } catch (error) {
      console.error('Error fetching works:', error);
      throw error;
    }
  },

  async getContacts(): Promise<Contact[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        headers: buildDefaultHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
        return [data.data];
      }
      
      if (data && typeof data === 'object' && 'data' in data) {
        if (data.data && typeof data.data === 'object' && 'data' in data.data) {
          return data.data.data || [];
        }
        if (Array.isArray(data.data)) {
          return data.data;
        }
      }
      
      if (Array.isArray(data)) {
        return data;
      }
      
      console.warn('Unexpected API response format:', data);
      return [];
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },
};