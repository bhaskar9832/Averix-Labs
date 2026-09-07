import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
      <p className="text-slate-400 text-sm mb-10">Last updated: {new Date().toLocaleDateString("en-IN")}</p>
      <div className="space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Introduction</h2>
          <p>Welcome to {siteConfig.name}. We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Data We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data:</strong> Full name, company name.</li>
            <li><strong>Contact Data:</strong> Email address, phone number.</li>
            <li><strong>Project Data:</strong> Project descriptions, budget ranges, and timelines you share via our inquiry form.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, and usage data collected via analytics.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">3. How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To respond to your project inquiries and provide quotes.</li>
            <li>To communicate about ongoing projects.</li>
            <li>To improve our website and services.</li>
            <li>We will never sell your data to third parties.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Data Retention</h2>
          <p>We retain your personal data only for as long as necessary to fulfil the purposes we collected it for, or as required by law.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Contact Us</h2>
          <p>For any questions about this policy, contact us at <a href={`mailto:${siteConfig.email}`} className="text-blue-600 hover:underline">{siteConfig.email}</a>.</p>
        </section>
      </div>
    </div>
  );
}
