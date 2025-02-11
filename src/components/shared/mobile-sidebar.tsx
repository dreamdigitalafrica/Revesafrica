import Link from "next/link";
import { FaArrowDown, FaTimes } from "react-icons/fa";

interface MobileSideBarProps {
  isDropDownOpen: boolean;
  handleClose: () => void;
  handleDropDown: () => void;
}

const MobileSideBar = ({
  handleClose,
  handleDropDown,
  isDropDownOpen,
}: MobileSideBarProps) => {
  return (
    <nav className="md:hidden fixed top-0 left-0 flex text-xl max-w-sm flex-col p-8 w-full  bg-white h-full gap-8 font-semibold">
      <div
        className="menu-toggle w-max md:hidden ml-auto"
        onClick={handleClose}
      >
        <FaTimes size={24} />
      </div>
      <Link onClick={handleClose} href={"/"}>
        Home
      </Link>

      <div className="flex flex-col">
        <div
          onClick={handleDropDown}
          className="flex cursor-pointer items-center space-x-4"
        >
          <span>Who we are</span>
          <FaArrowDown />
        </div>

        {isDropDownOpen && (
          <div className="w-fit flex flex-col space-y-4 items-center px-7 py-3 rounded-lg">
            <Link href={"/about"}>About</Link>
            <Link href={"/team"}>Team</Link>
          </div>
        )}
        {/* Fixed routes */}
      </div>
      {/* Fixed routes */}
      <Link onClick={handleClose} href={"/projects"}>
        Projects
      </Link>
      <Link onClick={handleClose} href={"#projects"}>
        Blog
      </Link>
      <Link
        onClick={handleClose}
        href="https://flutterwave.com/donate/fqla2cajv8yi?_gl=1%2ahjgupl%2a_gcl_au%2aMTU1MDEzNzk2NC4xNzI1ODk5NjE0%2a_ga%2aMTQzMjAwNzc2MC4xNzIzMTE3MzM3%2a_ga_KQ9NSEMFCF%2aMTcyNTg5OTIwMy4yLjEuMTcyNTkwMDA1Ny41OS4wLjA."
      >
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
