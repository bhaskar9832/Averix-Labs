import { siteConfig } from "@/config/site";
import { ImageResponse } from 'next/og';

export const alt = 'Averix Labs — Custom software, web applications and AI development';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', background: '#050505', color: '#f8fafc' }}>
      <div style={{ display: 'flex', color: '#a5b4fc', fontSize: 28, marginBottom: 32 }}>AVERIX LABS</div>
      <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>Software built around your business.</div>
      <div style={{ display: 'flex', fontSize: 28, color: '#cbd5e1', marginTop: 32 }}>Web applications · SaaS · AI tools · Automation</div>
      <div style={{ display: 'flex', fontSize: 24, color: '#a5b4fc', marginTop: 44 }}>{new URL(siteConfig.url).hostname}</div>
    </div>, size,
  );
}
