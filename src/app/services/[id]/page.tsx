import { use } from 'react';
import ServiceDetailClient from './ServiceDetailClient';
import { api, Service } from '../../../lib/api';

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  try {
    const list: Service[] = await api.getServices();
    return list
      .filter((s) => Number.isFinite(Number(s.id)))
      .map((s) => ({ id: String(s.id) }));
  } catch (e) {
    console.warn('[generateStaticParams] fallback due to API error:', e);
    return [{ id: '1' }];
  }
}

export const dynamic = 'error';

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <ServiceDetailClient id={Number(id)} />;
}
