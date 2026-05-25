"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import MobileSideBar from "./mobile-sidebar";

export interface IDropDown {
  donate: boolean;
  whoWeAre: boolean;
}

export type THandleDropDown = "donate" | "whoWeAre" | "both";

const navItems = [
  { name: "Our Mission", href: "/our-mission" },
  { name: "Impact", href: "/impact" },
  { name: "Programs", href: "/programs" },
  { name: "About Us", href: "/about-us" },
];

const buttonItems = [
  { name: "Join Us", href: "/#contact-us" },
  { name: "Donate Now", href: "/donate" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [menuOnMobile, setMenuOnMobile] = useState<boolean>(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState<IDropDown>({
    donate: false,
    whoWeAre: false,
  });

  const currentPath = usePathname();
  const isHome = currentPath === "/";
  const heroHeight = 100;

  const handleScroll = () => {
    setIsScrolled(window.scrollY > heroHeight);
  };

  const handleMenuOnMobile = () => setMenuOnMobile((prev) => !prev);

  const handleDropDown = (dropItem: THandleDropDown) => {
    setIsDropDownOpen((prev) => {
      if (dropItem === "donate") return { ...prev, donate: !prev.donate };
      if (dropItem === "whoWeAre") return { ...prev, whoWeAre: !prev.whoWeAre };
      return { donate: false, whoWeAre: false };
    });
  };

  useEffect(() => {
    if (isHome) window.addEventListener("scroll", handleScroll);
    return () => {
      if (isHome) window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  return (
    <header
      className={`z-50 w-full top-0 transition-colors duration-300 ${
        isHome
          ? isScrolled
            ? "bg-white fixed shadow-md"
            : "bg-transparent fixed"
          : "bg-white sticky shadow-md"
      }`}
    >
      <div className="container w-full px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="logo w-max relative h-12 md:h-14">
          <Image
            alt="Reves Foundation Logo"
            src="/reves-logo-dark.png"
            height={800}
            width={1200}
            loading="lazy"
            quality={100}
            className="h-full w-full hidden object-contain md:block"
          />
          <Image
            alt="Reves Foundation Logo"
            src="/logo-mobile.png"
            height={540}
            width={490}
            loading="lazy"
            quality={100}
            className="md:hidden h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex text-base items-center gap-4 font-semibold">
          {/* Nav links */}
          <ul
            className={`flex gap-8 items-center rounded-full py-2 px-8 text-gray-900 transition-all ${
              isHome && !isScrolled
                ? "bg-gray-100 bg-opacity-30 backdrop-blur-lg"
                : "bg-transparent"
            }`}
          >
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`hover:opacity-70 transition-opacity ${
                    currentPath === item.href
                      ? "underline underline-offset-4"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA buttons */}
        <ul className="flex items-center gap-3">
          {buttonItems.map((item) => {
            const isDonate = item.name === "Donate Now";
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isDonate
                      ? "bg-[#3AF40C] text-gray-900 hover:brightness-90"
                      : "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle */}
        <div
          className="menu-toggle p-1 bg-white rounded-md transition md:hidden hover:scale-105"
          onClick={handleMenuOnMobile}
        >
          <HiOutlineMenuAlt1 size={24} color="black" />
        </div>

        {menuOnMobile && (
          <MobileSideBar
            handleDropDown={handleDropDown}
            isDropDownOpen={isDropDownOpen}
            handleClose={handleMenuOnMobile}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
