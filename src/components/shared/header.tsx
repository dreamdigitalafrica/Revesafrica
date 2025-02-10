"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import MobileSideBar from "./mobile-sidebar";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [menuOnMobile, setMenuOnMobile] = useState<boolean>(false);
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

  const handleMenuOnMobile = () => {
    setMenuOnMobile((prev) => !prev);
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
      className={`w-fit z-50 top-0 transition-colors duration-300 ${
        isHome
          ? isScrolled
            ? "bg-white fixed shadow-md"
            : "bg-transparent fixed"
          : "bg-white sticky shadow-md"
      }`}
    >
      <div className="w-screen px-5 md:px-14 flex justify-between items-center">
        <Link href={"/"} className="logo w-max relative h-12 md:h-14">
          <Image
            alt="Reves Foundation Logo"
            src={"/reves-logo-dark.png"}
            height={120}
            loading="lazy"
            width={200}
            quality={1}
            className="h-full w-full hidden object-contain md:block"
          />

          <Image
            alt="Reves Foundation Logo"
            src={"/logo-mobile.png"}
            height={54}
            width={49}
            loading="lazy"
            quality={1}
            className="md:hidden"
          />
        </Link>

        <nav className="hidden md:flex text-sm items-center justify-end gap-4 font-semibold">
          <ul
            className={`flex gap-8 items-center rounded-full py-2 px-8 text-gray-900 transition-all ${
              isHome && !isScrolled
                ? "bg-gray-100 bg-opacity-30 backdrop-blur-lg"
                : "bg-transparent"
            }`}
          >
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link> {/* Fixed routes */}
            </li>
            <li>
              <Link href={"/projects"}>Projects</Link>
            </li>
            <li>
              <Link href={"/#projects"}>Blog</Link>
            </li>
            <li>
              <Link href="https://flutterwave.com/donate/fqla2cajv8yi?_gl=1%2ahjgupl%2a_gcl_au%2aMTU1MDEzNzk2NC4xNzI1ODk5NjE0%2a_ga%2aMTQzMjAwNzc2MC4xNzIzMTE3MzM3%2a_ga_KQ9NSEMFCF%2aMTcyNTg5OTIwMy4yLjEuMTcyNTkwMDA1Ny41OS4wLjA.">
                Donate
              </Link>
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
