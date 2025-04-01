"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import MobileSideBar from "./mobile-sidebar";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface HeaderProps {}

export interface IDropDown {
  donate: boolean;
  whoWeAre: boolean;
}

export type THandleDropDown = "donate" | "whoWeAre" | "both";

const Header = ({}: HeaderProps) => {
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

  const handleMenuOnMobile = () => {
    setMenuOnMobile((prev) => !prev);
  };
  const handleDropDown = (dropItem: "donate" | "whoWeAre" | "both") => {
    setIsDropDownOpen((prev) => {
      if (dropItem === "donate") {
        return { ...prev, donate: !prev.donate };
      } else if (dropItem === "whoWeAre") {
        return { ...prev, whoWeAre: !prev.whoWeAre };
      } else {
        return { donate: false, whoWeAre: false };
      }
    });
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
      className={`w-fit z-50 top-0 transition-colors duration-300 ${
        isHome
          ? isScrolled
            ? "bg-white fixed shadow-md"
            : "bg-transparent fixed"
          : "bg-white sticky shadow-md"
      }`}
    >
      <div className="w-screen px-5 py-3 md:px-14 flex justify-between items-center">
        <Link href={"/"} className="logo w-max relative h-12 md:h-14">
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
            className={`flex gap-8 items-center rounded-full py-2 px-8 text-gray-900 transition-all ${
              isHome && !isScrolled
                ? "bg-gray-100 bg-opacity-30 backdrop-blur-lg"
                : "bg-transparent"
            }`}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li className="relative">
              <div
                onClick={() => handleDropDown("whoWeAre")}
                className="flex cursor-pointer items-center space-x-2"
              >
                <span>Who we are</span>
                {!isDropDownOpen.whoWeAre ? (
                  <FaChevronDown size={12} />
                ) : (
                  <FaChevronUp size={12} />
                )}
              </div>

              {isDropDownOpen.whoWeAre && (
                <ul
                  onClick={() => {
                    handleDropDown("both");
                  }}
                  className="absolute p-4 flex flex-col gap-4 bg-white top-8 left-0 rounded-xl shadow-lg"
                >
                  <li>
                    <Link
                      href={"/about"}
                      className="w-20 py-2 px-2 pr-4 rounded-lg"
                    >
                      About
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={"/team"}
                      className="w-20 py-2 px-2 pr-4 rounded-lg"
                    >
                      Team
                    </Link>
                  </li>
                </ul>
              )}
              {/* Fixed routes */}
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
              onClick={() => handleDropDown("donate")}
            >
              <span className="flex gap-2 items-center">
                Donate
                {!isDropDownOpen.donate ? (
                  <FaChevronDown size={12} />
                ) : (
                  <FaChevronUp size={12} />
                )}
              </span>
              {isDropDownOpen.donate && (
                <ul
                  onClick={() => {
                    handleDropDown("both");
                  }}
                  className="absolute p-4 flex flex-col gap-4 bg-white top-8 left-0 rounded-xl shadow-lg"
                >
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
