"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

const quickLinks = [
  { name: "Our Mission", href: "/about#mission" },
  { name: "Current Programs", href: "/projects" },
  { name: "Recent Impact", href: "/#projects" },
  { name: "Success Stories", href: "/blog" },
];

const supportLinks = [
  { name: "How to Donate", href: "https://flutterwave.com/donate/fqla2cajv8yi" },
  { name: "Volunteer Form", href: "https://forms.gle/qcjw4CUr63nfwV3K9" },
  { name: "Partner With Us", href: "/#contact-us" },
];

const socialLinks = [
  {
    href: "https://m.facebook.com/RAYCDFOUNDATION/",
    icon: FaFacebook,
    label: "Facebook",
  },
  {
    href: "https://ng.linkedin.com/company/revesfoundation",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://twitter.com/Revesfoundation",
    icon: FaXTwitter,
    label: "Twitter",
  },
  {
    href: "https://www.instagram.com/revesfoundation/",
    icon: FaInstagram,
    label: "Instagram",
  },
];

const Footer = () => {
  return (
    <footer className="reves-original-footer w-full bg-[#0d1117] text-white">
      {/* Main grid */}
      <div className="container mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="relative h-10 w-44 flex-shrink-0">
            <Image
              alt="Reves African Foundation Logo"
              src="/reves-logo-trans.png"
              fill
              className="object-contain object-left"
            />
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Empowering the youth and children of Africa through education,
            health, and sustainable community development programs since 2014.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-4 mt-1">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                className="text-gray-400 hover:text-[#3AF40C] transition-colors"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[#3AF40C] text-xs font-bold uppercase tracking-widest mb-2">
            Quick Links
          </h3>
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 text-sm hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Col 3 — Support */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[#3AF40C] text-xs font-bold uppercase tracking-widest mb-2">
            Support
          </h3>
          {supportLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 text-sm hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Col 4 — Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[#3AF40C] text-xs font-bold uppercase tracking-widest mb-2">
            Contact Information
          </h3>
          <div className="flex items-start gap-3 text-sm text-gray-300">
            <MdLocationOn
              size={18}
              className="text-[#3AF40C] mt-0.5 flex-shrink-0"
            />
            <span>
              123 Empowerment Way, Central Business District, Abuja, Nigeria
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <MdEmail size={18} className="text-[#3AF40C] flex-shrink-0" />
            <a
              href="mailto:contact@revesfoundation.org"
              className="hover:text-white transition-colors"
            >
              contact@revesfoundation.org
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <MdPhone size={18} className="text-[#3AF40C] flex-shrink-0" />
            <a
              href="tel:+2347032885407"
              className="hover:text-white transition-colors"
            >
              +234 (0) 703 288 5407
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>
            © {new Date().getFullYear()} Reves African Youth and Children
            Development Foundation. All rights reserved.
          </span>
          <div className="flex items-center gap-5">
            <Link href="mailto:contact@revesfoundation.org?subject=Privacy%20enquiry" className="hover:text-white transition-colors">
              Privacy Enquiries
            </Link>
            <Link href="mailto:contact@revesfoundation.org?subject=Tax%20information%20request" className="hover:text-white transition-colors">
              Request Tax Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
