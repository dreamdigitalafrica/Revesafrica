import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { IDropDown, THandleDropDown } from "./header";

const navItems = [
  { name: "Our Mission", href: "/about#mission" },
  { name: "Impact", href: "/#projects" },
  { name: "Programs", href: "/projects" },
  { name: "About Us", href: "/about" },
];

interface MobileSideBarProps {
  handleClose: () => void;
  isDropDownOpen: IDropDown;
  handleDropDown: (dropItem: THandleDropDown) => void;
}

const MobileSideBar = ({ handleClose }: MobileSideBarProps) => {
  return (
    <nav className="md:hidden fixed top-0 left-0 flex text-xl max-w-sm flex-col p-8 w-full bg-white h-full gap-6 font-semibold z-50 shadow-xl">
      {/* Close */}
      <div className="ml-auto cursor-pointer" onClick={handleClose}>
        <FaTimes size={24} />
      </div>

      {/* Nav links */}
      {navItems.map((item) => (
        <Link key={item.name} href={item.href} onClick={handleClose}>
          {item.name}
        </Link>
      ))}

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Join Us — outlined */}
      <Link
        href="/#contact-us"
        onClick={handleClose}
        className="border-2 border-gray-900 text-gray-900 px-4 py-2.5 rounded-full text-center text-base hover:bg-gray-900 hover:text-white transition-all"
      >
        Join Us
      </Link>

      {/* Donate Now — green filled, direct Flutterwave link */}
      <Link
        href="https://flutterwave.com/donate/fqla2cajv8yi"
        target="_blank"
        onClick={handleClose}
        className="bg-[#F7901E] text-gray-900 px-4 py-2.5 rounded-full text-center text-base font-bold hover:brightness-90 transition-all"
      >
        Donate Now
      </Link>
    </nav>
  );
};

export default MobileSideBar;
