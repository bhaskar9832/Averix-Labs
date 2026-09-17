import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data";

export const metadata = {
  title: "Products — Averix Labs",
  description: "An ecosystem of premium platforms engineered, maintained, and grown by Averix Labs.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">04 / PORTFOLIO</div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
          Selected product work.
        </h1>
        <p className="text-xl text-[#94a3b8] max-w-3xl mb-16">
          These projects show range across marketplaces, AI learning, business operations, storytelling, and product systems design.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="group block h-full">
              <div className="bg-[#0a0a0a] border border-[#262626] rounded-2xl flex flex-col h-full group-hover:border-[#4f46e5]/50 transition-colors relative overflow-hidden">
                
                {/* Image Section */}
                <div className="h-64 md:h-80 w-full bg-[#121212] relative overflow-hidden flex items-center justify-center border-b border-[#262626]">
                  {product.interfaceImage ? (
                    <Image 
                      src={product.interfaceImage} 
                      alt={product.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="text-[#4f46e5] font-mono text-sm opacity-50">{product.slug.toUpperCase()}</div>
                  )}
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-50"></div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-10 flex flex-col flex-grow relative">
                  {/* Status Badge */}
                  <div className="absolute top-8 right-8">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded border uppercase tracking-wider
                      ${product.status === 'Active' ? 'text-green-400 bg-green-400/10 border-green-400/20' : 
                        product.status === 'Beta' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' :
                        product.status === 'Coming Soon' ? 'text-amber-400 bg-amber-400/10 border-amber-400/20' :
                        'text-purple-400 bg-purple-400/10 border-purple-400/20'}`}>
                      {product.status}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-[#4f46e5] mb-2 uppercase tracking-widest">{product.category}</div>
                  <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-[#4f46e5] transition-colors">{product.name}</h2>
                  <p className="text-[#94a3b8] mb-8 text-lg flex-grow leading-relaxed">{product.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {product.technology.slice(0, 3).map((tech, i) => (
                      <span key={i} className="inline-block bg-[#121212] border border-[#262626] text-[#64748b] text-xs font-semibold px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
