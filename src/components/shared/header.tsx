"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import MobileSideBar from "./mobile-sidebar";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface HeaderProps { }

const Header = ({ }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [menuOnMobile, setMenuOnMobile] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const currentPath = usePathname();
  const isHome = currentPath === "/";

  const heroHeight = 100;

  const handleScroll = () => {
    setIsScrolled(window.scrollY > heroHeight);
  };

  const handleMenuOnMobile = () => {
    setMenuOnMobile((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isHome) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (isHome) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isHome]);

  return (
    <header
      className={`w-fit z-50 top-0 transition-colors duration-300 ${isHome
        ? isScrolled
          ? "bg-white fixed shadow-md"
          : "bg-transparent fixed"
        : "bg-white sticky shadow-md"
        }`}
    >
      <div className="w-screen px-5 md:px-14 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="logo w-max relative h-12 md:h-14">
          <Image
            alt="Reves Foundation Logo"
            src="/reves-logo-dark.png"
            height={120}
            width={200}
            loading="lazy"
            quality={1}
            className="h-full w-full hidden object-contain md:block"
          />
          <Image
            alt="Reves Foundation Logo"
            src="/logo-mobile.png"
            height={54}
            width={49}
            loading="lazy"
            quality={1}
            className="md:hidden"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex text-sm items-center justify-end gap-4 font-semibold">
          <ul
            className={`flex gap-8 items-center rounded-full py-2 px-8 text-gray-900 transition-all ${isHome && !isScrolled
              ? "bg-gray-100 bg-opacity-30 backdrop-blur-lg"
              : "bg-transparent"
              }`}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/#projects">Blog</Link>
            </li>

            {/* Donate Dropdown */}
            <li
              className="relative cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}

            >
              <span className="flex gap-2 items-center" onClick={toggleDropdown}>Donate{!isDropdownOpen ? <FaChevronDown size={12} /> : <FaChevronUp size={12} />}</span>
              {isDropdownOpen && (
                <ul
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="absolute p-4 flex flex-col gap-4 bg-white top-8 left-0 rounded-xl shadow-lg">
                  <li>
                    <Link
                      href="https://flutterwave.com/donate/fqla2cajv8yi"
                      target="_blank"
                    >
                      Flutterwave
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://paystack.com/pay/it-supplies-training"
                      target="_blank"
                    >
                      PayStack
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          <ul>
            <li>
              <Link
                className="bg-[#3AF40C] text-gray-900 px-4 py-2 rounded-full"
                href={"#contact-us"}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu */}
        <div
          className="menu-toggle p-1 bg-white rounded-md transition md:hidden hover:scale-105"
          onClick={handleMenuOnMobile}
        >
          <HiOutlineMenuAlt1 size={24} color="black" />
        </div>

        {menuOnMobile && <MobileSideBar handleClose={handleMenuOnMobile} />}
      </div>
    </header>
  );
};

export default Header;
