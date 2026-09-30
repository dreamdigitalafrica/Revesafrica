"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Retained for the legacy sidebar component.
export interface IDropDown { donate: boolean; whoWeAre: boolean; }
export type THandleDropDown = "donate" | "whoWeAre" | "both";
const links = [{ name: "About us", href: "/about" }, { name: "Our work", href: "/projects" }, { name: "Our people", href: "/team" }, { name: "Stories", href: "/blog" }];
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);
  return <header className="reves-header"><div className="reves-header-inner"><Link href="/" className="reves-logo" aria-label="Reves Foundation home"><Image src="/reves-logo-dark.png" alt="Reves Foundation" width={200} height={66} priority /></Link><nav className="reves-desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.name}</Link>)}</nav><Link className="reves-header-donate" href="https://flutterwave.com/donate/fqla2cajv8yi" target="_blank" rel="noopener noreferrer">Give <span aria-hidden="true">↗</span></Link><button className="reves-menu-toggle" aria-expanded={open} aria-controls="reves-mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? "Close −" : "Menu +"}</button></div>{open && <nav id="reves-mobile-navigation" className="reves-mobile-nav" aria-label="Mobile navigation" onKeyDown={event => { if (event.key === "Escape") setOpen(false); }}>{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.name}<span aria-hidden="true">↗</span></Link>)}<Link href="/#contact-us" onClick={() => setOpen(false)}>Get in touch <span aria-hidden="true">↗</span></Link></nav>}</header>;
}
