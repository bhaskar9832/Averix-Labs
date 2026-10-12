import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-start gap-1 ${className}`}>
      <Image 
        src="/images/logo.png" 
        alt="Averix Labs" 
        width={200} 
        height={56} 
        className="h-14 w-auto brightness-0 invert"
        priority
      />
      <span className="text-[11px] text-[#64748b] font-bold tracking-[0.25em] uppercase pl-1.5">
        Control Plane
      </span>
    </div>
  )
}
