"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const currentPath = usePathname();

  const isHome = currentPath === "/";

  const heroHeight = 100;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > heroHeight) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
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
  }, [isHome, heroHeight]);

  return (
    <header
      className={`py-2 w-full z-50 top-0 transition-colors duration-300 ${
        isHome
          ? isScrolled
            ? "bg-white fixed shadow-md"
            : "bg-transparent fixed"
          : "bg-white sticky shadow-md"
      }`}
    >
      <div className="container flex justify-between gap-4 items-center">
        <Link href={"/"} className="logo w-max relative h-12 md:h-14">
          <Image
            alt="Reves Foundation Logo"
            src={"/reves-logo-dark.png"}
            height={120}
            loading="lazy"
            width={200}
            quality={1}
            className="h-full w-full object-contain"
          />
        </Link>

        <nav className="hidden md:flex text-sm items-center w-max justify-end gap-4 font-medium">
          <ul
            className={`flex gap-8 items-center rounded-full py-2 px-8 text-gray-900 transition-all ${
              isHome && !isScrolled
                ? "bg-gray-100 bg-opacity-75 backdrop-blur-lg"
                : "bg-transparent"
            }`}
          >
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"#about-us"}>About</Link> {/* Fixed routes */}
            </li>
            <li>
              <Link href={"#projects"}>Projects</Link>
            </li>
            <li>
              <Link href={"#projects"}>Blog</Link>
            </li>
            <li>
              <Link href={"#support"}>Donate</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link
                className="bg-green-400 text-gray-900 px-4 py-2 rounded-full"
                href={"#contact-us"}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="menu-toggle md:hidden">
          <FaBars size={24} />
        </div>
      </div>
    </header>
  );
};

export default Header;
