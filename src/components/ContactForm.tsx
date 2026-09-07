"use client";

import { useState } from "react";
import { submitProjectInquiry } from "@/lib/supabase";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      full_name: formData.get("fullName") as string,
      company_name: formData.get("companyName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      project_type: formData.get("projectType") as string,
      estimated_budget: formData.get("estimatedBudget") as string,
      project_timeline: formData.get("projectTimeline") as string,
      description: formData.get("description") as string,
      how_did_you_hear: formData.get("howDidYouHear") as string,
    };

    try {
      await submitProjectInquiry(data);
      setIsSuccess(true);
      form.reset();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm";
  const selectClass =
    "w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

  if (isSuccess) {
    return (
      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-10 rounded-2xl text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-3">Thank You!</h3>
        <p className="text-blue-700">
          We've received your project request. Our team will review the details and contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className={labelClass}>Full Name *</label>
          <input required type="text" id="fullName" name="fullName" className={inputClass} placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="companyName" className={labelClass}>Company Name</label>
          <input type="text" id="companyName" name="companyName" className={inputClass} placeholder="Acme Corp" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className={labelClass}>Email Address *</label>
          <input required type="email" id="email" name="email" className={inputClass} placeholder="john@example.com" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone / WhatsApp</label>
          <input type="tel" id="phone" name="phone" className={inputClass} placeholder="+91 98325 60193" />
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className={labelClass}>What do you want to build? *</label>
        <select required id="projectType" name="projectType" className={selectClass}>
          <option value="">Select an option</option>
          <option value="Website">Website</option>
          <option value="Web Application">Web Application</option>
          <option value="Mobile App">Mobile App</option>
          <option value="SaaS Product">SaaS Product</option>
          <option value="E-Commerce">E-Commerce</option>
          <option value="Custom Software">Custom Software</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="estimatedBudget" className={labelClass}>Estimated Budget</label>
          <select id="estimatedBudget" name="estimatedBudget" className={selectClass}>
            <option value="">Select an option</option>
            <option value="Under ₹50,000">Under ₹50,000</option>
            <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
            <option value="₹1,00,000 – ₹3,00,000">₹1,00,000 – ₹3,00,000</option>
            <option value="₹3,00,000+">₹3,00,000+</option>
            <option value="Not Sure">Not Sure</option>
          </select>
        </div>
        <div>
          <label htmlFor="projectTimeline" className={labelClass}>Project Timeline</label>
          <select id="projectTimeline" name="projectTimeline" className={selectClass}>
            <option value="">Select an option</option>
            <option value="ASAP">ASAP</option>
            <option value="1–3 Months">1–3 Months</option>
            <option value="3–6 Months">3–6 Months</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>Project Description *</label>
        <textarea
          required
          id="description"
          name="description"
          rows={5}
          className={inputClass}
          placeholder="Tell us about your idea, features needed, target users, etc."
        />
      </div>

      <div>
        <label htmlFor="howDidYouHear" className={labelClass}>How did you hear about us?</label>
        <input type="text" id="howDidYouHear" name="howDidYouHear" className={inputClass} placeholder="Google, LinkedIn, Referral, etc." />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 rounded-lg text-base transition-colors cursor-pointer"
      >
        {isSubmitting ? "Submitting…" : "Request a Free Consultation"}
      </button>
    </form>
  );
}
