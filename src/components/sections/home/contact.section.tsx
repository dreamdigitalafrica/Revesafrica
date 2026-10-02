/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import emailJs from "@emailjs/browser";

const ContactUsSection = () => {
  const emailConfigured = Boolean(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID && process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID && process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await emailJs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Replace this
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // Replace this
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY // Replace this
      );
      setSuccessMsg("Message sent successfully!");
      formRef.current?.reset();
    } catch (error: any) {
      setErrorMsg("Failed to send message. Please try again.");
      console.error("Email error:", error.text || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-12" id="contact-us">
      <div className="container mx-auto px-4">
        <div className="section-header md:max-w-lg mb-8">
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-700">
            Get in Touch
          </h2>
          <p className="mt-2 text-gray-600">
            Contact us by email or phone, or use the form when available. Call between 9:00 a.m.
            and 8:00 p.m. WAT, Monday through Friday.
          </p>
        </div>

        <div className="flex md:flex-row flex-col-reverse gap-8">
          {/* Contact Form */}
          <div className="w-full md:max-w-3xl">
            {emailConfigured ? <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                name="user_name"
                required
                className="w-full border px-6 md:py-5 py-4 text-base rounded-md"
              />
              <input
                type="email"
                placeholder="Your Email"
                name="user_email"
                required
                className="w-full border px-6 md:py-5 py-4 text-base rounded-md"
              />
              <input
                type="text"
                placeholder="How did you hear about us?"
                name="referral"
                className="w-full border px-6 md:py-5 py-4 text-base rounded-md"
              />
              <textarea
                rows={4}
                name="message"
                placeholder="Your Message"
                required
                className="w-full border px-6 md:py-5 py-4 text-base rounded-md"
              ></textarea>

              {successMsg && <p className="text-green-600">{successMsg}</p>}
              {errorMsg && <p className="text-red-500">{errorMsg}</p>}

              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 font-semibold rounded-md disabled:opacity-50"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form> : <p className="py-6">Send your message to <a className="text-blue-600 underline" href="mailto:contact@revesfoundation.org">contact@revesfoundation.org</a>.</p>}
          </div>

          {/* Contact Info */}
          <div className="w-full md:max-w-sm space-y-4">
            <div>
              <p className="font-semibold">Address:</p>
              <a
                href="https://maps.app.goo.gl/voAYeCq4WAi5VyMj7"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Kubwa, Abuja, Nigeria.
              </a>
            </div>

            <div>
              <p className="font-semibold">Email:</p>
              <a
                href="mailto:contact@revesfoundation.org"
                className="text-blue-600 underline"
              >
                contact@revesfoundation.org
              </a>
            </div>

            <div>
              <p className="font-semibold">Phone:</p>
              <a href="tel:+2347037078046" className="text-blue-600 underline">
                +234 703 707 8046
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
