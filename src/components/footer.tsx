import Image from "next/image";
import Link from "next/link";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  return (
    <footer
      className="relative h-max"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="h-max sticky bottom-0 text-white bg-black">
        <div className="flex shrink-0 md:items-center gap-12 md:gap-8  justify-between container flex-col md:flex-row py-12 md:py-32">
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

          <div className="socials flex gap-4 md:gap-6">
            <Link href={"#"}>
              <FaFacebook size={18} />
            </Link>

            <Link href={"#"}>
              <FaLinkedin size={18} />
            </Link>

            <Link href={"#"}>
              <FaXTwitter size={18} />
            </Link>

            <Link href={"#"}>
              <FaInstagram size={18} />
            </Link>
          </div>

          <p className="uppercase text-sm leading-none">
            Everyone deserves the best
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
