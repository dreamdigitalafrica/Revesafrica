"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
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
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [heroHeight]);

  return (
    <header
      className={`py-2 fixed w-full z-50 top-0 ${isScrolled && "bg-white"}`}
    >
      <div className="container flex justify-between gap-4 transition-all items-center">
        <div className="logo w-max relative h-14">
          <Image
            alt="Reves Foundation Logo"
            src={"/reves-logo-dark.png"}
            height={64}
            loading="lazy"
            width={120}
            quality={1}
            className="h-full w-full object-contain"
          />
        </div>

        <nav className=" items-center w-max justify-end flex gap-4  font-medium">
          <ul
            className={`flex gap-8 items-center rounded-full py-2 px-8   text-gray-900 transition-all ${
              !isScrolled
                ? "bg-gray-100 bg-opacity-75 backdrop-blur-lg"
                : "bg-transparent"
            } `}
          >
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/"}>About</Link>
            </li>
            <li>
              <Link href={"/"}>Portfolio</Link>
            </li>
            <li>
              <Link href={"/"}>News</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link
                className="bg-green-400 text-gray-900 px-4 py-2 rounded-full"
                href={"/"}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
