import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services } from '@/data/services';

export const dynamicParams = false;
export function generateStaticParams() { return services.map(service => ({ slug: service.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  return { title: service.title, description: service.description };
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  return <div className="max-w-4xl mx-auto px-6 py-24">
    <Link href="/services" className="text-indigo-400">← All services</Link>
    <h1 className="text-4xl md:text-6xl font-bold mt-8 mb-6">{service.title}</h1>
    <p className="text-xl text-[#94a3b8] leading-relaxed mb-8">{service.description}</p>
    <p className="text-indigo-400 mb-12">{service.tags}</p>
    <h2 className="text-2xl font-semibold mb-4">Start with your business goal</h2>
    <p className="text-[#94a3b8] leading-relaxed mb-8">Tell us who will use the software, what it needs to do, and which existing systems it should connect to. We can discuss the first useful release and a practical implementation plan.</p>
    <div className="flex flex-wrap gap-4">
      <Link href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg">Discuss your project</Link>
      <Link href="/products" className="border border-[#262626] px-6 py-3 rounded-lg">View our portfolio</Link>
    </div>
  </div>;
}
