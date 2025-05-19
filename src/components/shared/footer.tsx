"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { Moon, Sun } from "lucide-react";

const Footer = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <footer
      className={`w-full ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Top Section */}
      <div className="container mx-auto px-6 py-10 md:py-20 flex flex-col md:flex-row justify-between gap-10">
        {/* Logo */}
        <div className="flex justify-start flex-col gap-4">
          <Link href="/" className="relative h-12 flex justify-start w-48">
            <Image
              alt="Reves African Foundation Logo"
              src="/reves-logo-trans.png"
              fill
              className="object-contain h-full w-full"
            />
          </Link>

          <p className="text-sm uppercase tracking-wide">
            Everyone deserves the best
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <Link href="/about" className="hover:underline">
            About Us
          </Link>
          <Link href="/projects" className="hover:underline">
            Projects
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>

        {/* Social + Theme + Language */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex space-x-4 items-center">
            <Link
              href="https://m.facebook.com/RAYCDFOUNDATION/"
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebook size={20} className="hover:text-primary transition" />
            </Link>
            <Link
              href="https://ng.linkedin.com/company/revesfoundation"
              target="_blank"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} className="hover:text-primary transition" />
            </Link>
            <Link
              href="https://twitter.com/Revesfoundation"
              target="_blank"
              aria-label="Twitter"
            >
              <FaXTwitter size={20} className="hover:text-primary transition" />
            </Link>
            <Link
              href="https://www.instagram.com/revesfoundation/"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram
                size={20}
                className="hover:text-primary transition"
              />
            </Link>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-sm hover:underline"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Language Switch (placeholder) */}
          <select className="bg-transparent border border-white/20 px-2 py-1 rounded text-sm">
            <option>English</option>
            <option disabled>French (coming soon)</option>
          </select>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className={`border-t ${
          darkMode ? "border-white/10" : "border-black/10"
        } py-4 text-center text-xs text-gray-400`}
      >
        © {new Date().getFullYear()} Reves African Foundation. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
