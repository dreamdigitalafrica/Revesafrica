"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    badge: "Our Mission",
    image: "/about-us.webp",
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
    image: "/images/projects/project-2.jpg",
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
  const slide = slides[current];
  return (
    <section className="reves-home-hero" aria-label="Featured programs" aria-roledescription="carousel">
      <div className="reves-home-hero-frame">
        <Image src={slide.image} alt="" fill priority sizes="100vw" className="reves-home-hero-image" />
        <div className="reves-home-hero-shade" />
        <div className="reves-home-hero-copy" aria-live="polite" aria-atomic="true">
          <span>{slide.badge}</span>
          <h1>{slide.title}</h1>
          <p>{slide.description}</p>
          <div className="reves-home-hero-actions">
            <Link href={slide.primaryCta.href}>{slide.primaryCta.text}</Link>
            <Link href={slide.secondaryCta.href}>{slide.secondaryCta.text}</Link>
          </div>
        </div>
        <div className="reves-home-hero-controls">
          <button onClick={() => setCurrent((current - 1 + slides.length) % slides.length)} aria-label="Previous slide"><FaChevronLeft /></button>
          {slides.map((item, i) => <button key={item.id} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`} aria-pressed={i === current}><span /></button>)}
          <button onClick={() => setCurrent((current + 1) % slides.length)} aria-label="Next slide"><FaChevronRight /></button>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
