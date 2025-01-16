"use client";

import React from "react";

interface ContactUsSectionProps {}

const ContactUsSection = ({}: ContactUsSectionProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="bg-white md:py-12" id="contact-us">
      <div className="container">
        <div className="section-header md:max-w-lg flex flex-col gap-4">
          <h1 className="my-0 text-3xl md:text-5xl font-normal">
            Get in Touch
          </h1>
          <p>
            Please fill out the form on this section to contact with me. Or call
            between 9:00 a.m. and 8:00 p.m. WAT, Monday through Friday.
          </p>
        </div>

        <div className="flex md:gap-8 gap-4 flex-col-reverse md:flex-row py-8">
          <div className="form-container w-full">
            <form action="" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="input-container">
                <label htmlFor="name"></label>
                <input type="text" placeholder="Name" name="name" id="name" />
              </div>

              {/* Email */}
              <div className="input-container">
                <label htmlFor="email"></label>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  id="email"
                />
              </div>

              {/* How you heard about us */}
              <div className="input-container">
                <label htmlFor="email"></label>
                <input
                  type="text"
                  placeholder="How did you here about us?"
                  name="email"
                  id="email"
                />
              </div>

              {/* How you heard about us */}
              <div className="input-container">
                <label htmlFor="email"></label>
                <textarea
                  rows={3}
                  name="email"
                  placeholder="Message..."
                  id="message"
                ></textarea>
              </div>

              <input
                type="submit"
                value={"Submit"}
                className="bg-green-400 font-semibold cursor-pointer"
              />
            </form>
          </div>
          {/*  */}.
          <div className="flex flex-col w-full md:max-w-sm pt-4">
            {/* Address */}
            <div className="flex gap-2">
              <p className="label">Address:</p>
              <a
                href="https://maps.app.goo.gl/voAYeCq4WAi5VyMj7"
                target="_blank"
                rel="noreferrer"
                className=""
              >
                Kubwa, Abuja, Nigeria.
              </a>
            </div>

            {/* Email */}
            <div className="flex gap-2">
              <p className="label">Email:</p>
              <a
                href="mailto:contact@revesfoundation.org"
                target="_blank"
                rel="noreferrer"
              >
                contact@revesfoundation.org
              </a>
            </div>

            {/* Phone */}
            <div className="flex gap-2">
              <p className="label">Phone:</p>
              <a href="tel:2347037078046" target="_blank" rel="noreferrer">
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
