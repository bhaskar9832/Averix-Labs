import Link from 'next/link';
import type { Metadata } from 'next';
import { services } from '@/data/services';

export const metadata: Metadata = { title: 'Software Development Services', description: 'Explore our web applications, backend APIs, AI document tools, product discovery and business operations software services.' };

export default function ServicesPage() {
  return <div className="max-w-7xl mx-auto px-6 py-24">
    <h1 className="text-4xl md:text-6xl font-bold mb-6">Software development services</h1>
    <p className="text-[#94a3b8] text-lg mb-12">Practical software built around your users and business workflows.</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map(service => <Link key={service.slug} href={`/services/${service.slug}`} className="border border-[#262626] bg-[#0a0a0a] p-8 rounded-2xl hover:border-indigo-500 transition-colors">
        <h2 className="text-xl font-semibold mb-3">{service.title}</h2>
        <p className="text-[#94a3b8] leading-relaxed mb-4">{service.description}</p>
        <span className="text-indigo-400 text-sm">Explore this service →</span>
      </Link>)}
    </div>
  </div>;
}
