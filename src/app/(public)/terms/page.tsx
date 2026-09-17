import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Terms &amp; Conditions</h1>
      <p className="text-slate-400 text-sm mb-10">Last updated: {new Date().toLocaleDateString("en-IN")}</p>
      <div className="space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using the {siteConfig.name} website, you agree to be bound by these terms and conditions. If you disagree with any part, please do not use our website.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Services</h2>
          <p>{siteConfig.name} provides custom software development, web development, mobile application development, and related technology services. All project scope, timelines, and costs are defined in individual client agreements.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Intellectual Property</h2>
          <p>Upon full payment, clients receive full ownership of all custom-developed software and assets specific to their project. {siteConfig.name} retains the right to showcase completed projects in its portfolio unless otherwise agreed in writing.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Limitation of Liability</h2>
          <p>{siteConfig.name} shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services. Our liability is limited to the amount paid for the specific service in question.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Governing Law</h2>
          <p>These terms shall be governed by the laws of India. Any disputes shall be resolved in the courts of West Bengal, India.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Contact</h2>
          <p>For any questions about these terms, contact us at <a href={`mailto:${siteConfig.email}`} className="text-blue-600 hover:underline">{siteConfig.email}</a>.</p>
        </section>
      </div>
    </div>
  );
}
