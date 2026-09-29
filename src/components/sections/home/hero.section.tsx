"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    badge: "Our Mission",
    image: "/hero-image.png",
    mobileImage: "/hero-image-mobile.png",
    title: "Empowering Africa's Marginalized Youth to Thrive",
    description:
      "Founded in 2021, Rêves Foundation exists to uplift children and youth in underserved African communities. Through education, mentorship, and empowerment programs, we help them break barriers, build confidence, and become the leaders of tomorrow.",
    primaryCta: {
      text: "Become a Global Champion",
      href: "https://forms.gle/qcjw4CUr63nfwV3K9",
    },
    secondaryCta: { text: "Explore Programs", href: "/projects" },
  },
  {
    id: 2,
    badge: "Educational Excellence",
    image: "/hero-image.png",
    mobileImage: "/hero-image-mobile.png",
    title: "Unlocking Potential Through Quality Learning",
    description:
      "We provide the tools and resources necessary for children to excel and become the leaders of tomorrow.",
    primaryCta: { text: "Support Education", href: "https://flutterwave.com/donate/fqla2cajv8yi" },
    secondaryCta: { text: "Explore Programs", href: "/projects" },
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index: number) => {
    if (animating || index === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0d1117]">
      {/* Background Image with overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${animating ? "opacity-0" : "opacity-100"}`}
      >
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover hidden md:block"
          priority
        />
        <Image
          src={slide.mobileImage}
          alt={slide.title}
          fill
          className="object-cover md:hidden"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0d1117]/70" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col justify-center min-h-screen px-6 md:pl-16 lg:pl-24 transition-all duration-500 ${
          animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Badge */}
        <span className="inline-block mb-5 px-4 py-1.5 rounded-full bg-[#3AF40C] text-gray-900 text-sm font-bold w-max">
          {slide.badge}
        </span>

        {/* Heading */}
        <h1 className="text-white font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight max-w-3xl mb-5">
          {slide.title}
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
          {slide.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href={slide.primaryCta.href}
            className="px-7 py-3.5 rounded-xl bg-[#3AF40C] text-gray-900 font-bold text-base md:text-lg hover:brightness-90 transition-all shadow-lg"
          >
            {slide.primaryCta.text}
          </Link>
          <Link
            href={slide.secondaryCta.href}
            className="px-7 py-3.5 rounded-xl border-2 border-white/40 text-white font-semibold text-base md:text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            {slide.secondaryCta.text}
          </Link>
        </div>
      </div>

      {/* Slide controls — dots + arrows */}
      <div className="absolute bottom-8 left-6 md:left-16 lg:left-24 z-10 flex items-center gap-4">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 h-2.5 bg-[#3AF40C]"
                  : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            aria-label="Previous slide"
          >
            <FaChevronLeft size={12} />
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            aria-label="Next slide"
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
