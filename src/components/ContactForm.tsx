"use client";
import { useState } from "react";

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
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      project_type: formData.get("project_type") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/averixlabs001@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ...data,
            _subject: `New Project Inquiry from ${data.name}`,
            _template: "table"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSuccess(true);
      form.reset();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again or contact us directly at averixlabs001@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-[#262626] bg-[#121212] text-[#f8fafc] placeholder-[#64748b] focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] outline-none transition-all text-sm";
  const labelClass = "block text-xs font-medium text-[#94a3b8] mb-2 uppercase tracking-wider";

  if (isSuccess) {
    return (
      <div className="bg-[#121212] border border-[#262626] text-[#f8fafc] p-8 rounded-xl text-center">
        <h3 className="text-xl font-bold mb-2">Message sent successfully.</h3>
        <p className="text-[#94a3b8] text-sm">
          We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-8 space-y-6">
      {error && (
        <div className="bg-red-900/20 border border-red-500/50 text-red-400 text-sm p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClass}>Name *</label>
          <input required type="text" id="name" name="name" className={inputClass} placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input required type="email" id="email" name="email" className={inputClass} placeholder="jane@example.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className={labelClass}>Company</label>
          <input type="text" id="company" name="company" className={inputClass} placeholder="Optional" />
        </div>
        <div>
          <label htmlFor="project_type" className={labelClass}>Project Type *</label>
          <select required id="project_type" name="project_type" className={inputClass}>
            <option value="">Select type</option>
            <option value="SaaS Platform">SaaS Platform</option>
            <option value="Web Application">Web Application</option>
            <option value="Mobile Application">Mobile Application</option>
            <option value="AI Product">AI Product</option>
            <option value="API / Backend">API / Backend</option>
            <option value="Automation">Automation</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message *</label>
        <textarea
          required
          id="message"
          name="message"
          rows={4}
          className={inputClass}
          placeholder="Tell us about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto bg-[#4f46e5] hover:bg-[#4338ca] disabled:opacity-50 text-white font-medium px-8 py-3 rounded-lg text-sm transition-colors cursor-pointer"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
