import Link from "next/link";
import { FaTimes } from "react-icons/fa";

interface MobileSideBarProps {
  handleClose: () => void;
}

const MobileSideBar = ({ handleClose }: MobileSideBarProps) => {
  return (
    <nav className="md:hidden fixed top-0 left-0 flex text-xl max-w-sm flex-col p-8 w-full  bg-white h-full gap-8 font-medium">
      <div
        className="menu-toggle w-max md:hidden ml-auto"
        onClick={handleClose}
      >
        <FaTimes size={24} />
      </div>
      <Link onClick={handleClose} href={"/"}>
        Home
      </Link>
      <Link onClick={handleClose} href={"#about-us"}>
        About
      </Link>{" "}
      {/* Fixed routes */}
      <Link onClick={handleClose} href={"#projects"}>
        Projects
      </Link>
      <Link onClick={handleClose} href={"#projects"}>
        Blog
      </Link>
      <Link onClick={handleClose} href={"#support"}>
        Donate
      </Link>
      <Link
        onClick={handleClose}
        className="bg-green-400 text-gray-900 px-4 py-2 rounded-full"
        href={"#contact-us"}
      >
        Contact
      </Link>
    </nav>
  );
};

export default MobileSideBar;
