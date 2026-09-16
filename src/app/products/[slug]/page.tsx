import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} — Averix Labs`,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#4f46e5] selection:text-white">
      <div className="max-w-4xl mx-auto">
        <Link href="/products" className="inline-flex items-center text-sm font-bold text-[#4f46e5] hover:text-white mb-12 transition-colors">
          ← Back to Products
        </Link>
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
             <div className="text-sm font-bold text-[#4f46e5] uppercase tracking-widest">{product.category}</div>
             <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider
                    ${product.status === 'Active' ? 'text-green-400 bg-green-400/10 border-green-400/20' : 
                      product.status === 'Beta' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' :
                      product.status === 'Coming Soon' ? 'text-amber-400 bg-amber-400/10 border-amber-400/20' :
                      'text-purple-400 bg-purple-400/10 border-purple-400/20'}`}>
                {product.status}
              </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">{product.name}</h1>
          <p className="text-2xl text-[#94a3b8] leading-relaxed">{product.description}</p>
        </div>

        {/* Abstract Preview */}
        <div className="bg-[#0a0a0a] border border-[#262626] rounded-3xl aspect-[16/9] w-full mb-20 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4f46e5]/10 via-[#0a0a0a] to-[#0a0a0a]"></div>
            <div className="text-[#4f46e5] font-mono text-sm opacity-50 absolute top-6 left-6">{product.slug.toUpperCase()} {/* SYS_PREVIEW */}</div>
            
            {/* Visual Abstract based on product status */}
            <div className="w-1/2 h-1/2 border border-[#262626] rounded-xl flex items-center justify-center bg-[#121212] relative z-10 shadow-2xl">
              <span className="text-[#64748b] text-sm">Interface Preview</span>
            </div>
        </div>

        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">The Operating Problem</h3>
            <p className="text-[#94a3b8] leading-relaxed">{product.problem}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">The Solution</h3>
            <p className="text-[#94a3b8] leading-relaxed">{product.solution}</p>
          </div>
        </div>

        {/* Features & Technology */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 pb-20 border-b border-[#262626]">
          <div className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8">
            <h3 className="text-sm font-bold text-[#4f46e5] mb-6 uppercase tracking-widest">Core Features</h3>
            <ul className="space-y-4">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#4f46e5] font-bold mt-1">→</span>
                  <span className="text-[#f8fafc]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8">
            <h3 className="text-sm font-bold text-[#4f46e5] mb-6 uppercase tracking-widest">Built With</h3>
            <ul className="space-y-4">
              {product.technology.map((tech, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full mt-2"></span>
                  <span className="text-[#f8fafc]">{tech}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Philosophy & CTA */}
        <div className="text-center bg-[#0a0a0a] border border-[#262626] rounded-3xl p-12">
          <p className="text-2xl text-white font-serif italic mb-8 max-w-2xl mx-auto leading-relaxed">
            &quot;{product.philosophy}&quot;
          </p>
          <a href="#" className="inline-block bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
            {product.ctaText}
          </a>
        </div>
      </div>
    </div>
  );
}
