import Image from "next/image";
import Link from "next/link";

import { FaFacebook } from "react-icons/fa6";

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  return (
    <footer
      className="relative h-max"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="h-max sticky bottom-0 text-white bg-black">
        <div className="flex shrink-0 items-center gap-20 justify-between container py-8">
          <div className="flex flex-col gap-2">
            <div className="logo w-max relative h-16">
              <Image
                alt="Reves Foundation Logo"
                src={"/reves-logo-trans.png"}
                height={72}
                loading="lazy"
                width={180}
                quality={1}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="socials">
            <Link href={""}>
              <FaFacebook />
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="mb-2 uppercase text-[#ffffff80]">Education</h3>
            <p>News</p>
            <p>Learn</p>
            <p>Certification</p>
            <p>Publications</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
