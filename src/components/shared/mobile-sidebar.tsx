import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa6";

interface MobileSideBarProps {
  handleClose: () => void;
}

const MobileSideBar = ({ handleClose }: MobileSideBarProps) => {
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  return (
    <nav className="md:hidden fixed top-0 left-0 flex text-xl max-w-sm flex-col p-8 w-full bg-white h-full gap-6 font-semibold">
      {/* Close Button */}
      <div className="menu-toggle w-max md:hidden ml-auto" onClick={handleClose}>
        <FaTimes size={24} />
      </div>

      {/* Navigation Links */}
      <Link onClick={handleClose} href={"/"}>
        Home
      </Link>
      <Link onClick={handleClose} href={"/about"}>
        About
      </Link>
      <Link onClick={handleClose} href={"/projects"}>
        Projects
      </Link>
      <Link onClick={handleClose} href={"#projects"}>
        Blog
      </Link>

      {/* Donate Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDonateOpen((prev) => !prev)}
          className="w-full text-left flex gap-2 items-center"
        >
          Donate {isDonateOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
        </button>

        {isDonateOpen && (
          <ul className="mt-4 pl-4 flex flex-col gap-4">
            <li>
              <Link
                href="https://flutterwave.com/donate/fqla2cajv8yi"
                target="_blank"
                className="block"
                onClick={handleClose}
              >
                Flutterwave
              </Link>
            </li>
            <li>
              <Link
                href="https://paystack.com/pay/it-supplies-training"
                target="_blank"
                className="block"
                onClick={handleClose}
              >
                PayStack
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Contact Button */}
      <Link
        onClick={handleClose}
        className="bg-green-400 text-gray-900 px-4 py-2 rounded-full text-center"
        href={"#contact-us"}
      >
        Contact
      </Link>
    </nav>
  );
};

export default MobileSideBar;
