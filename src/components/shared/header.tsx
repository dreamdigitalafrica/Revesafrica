"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRevesProject } from "@/lib/hook";
export interface IDropDown { donate: boolean; whoWeAre: boolean; }
export type THandleDropDown = "donate" | "whoWeAre" | "both";
const groups = [
 {label: "About Us", links: [{label:"About Us",href:"/about"},{label:"Our Mission",href:"/about#mission"},{label:"Our timeline",href:"/about#timeline"},{label:"Our Team",href:"/team"}]},
 {label:"Programs",links:[{label:"Current Programs",href:"/projects"},{label:"Recent Impact",href:"/#projects"},{label:"Partner With Us",href:"/#contact-us"}]},
 {label:"Success Stories",links:[{label:"Success Stories",href:"/blog"},{label:"The Digital Literacy Project",href:"/projects/4pl0x8grg1er9qv"},{label:"The Big Smile Project",href:"/projects/j3fhhgfmav8nrwr"}]},
];
function SearchPanel({close}:{close:()=>void}) {
 const [query,setQuery]=useState(""); const {data,error}=useRevesProject();
 const results=(data??[]).filter(p=>p.title.toLowerCase().includes(query.toLowerCase()));
 return <div className="reves-search"><label htmlFor="site-search">Search our projects</label><input autoFocus id="site-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search" />
 <ul>{query && results.map(p=><li key={p.id}><Link href={`/projects/${p.id}`} onClick={close}>{p.title} ↗</Link></li>)}</ul>
 {query && !data && <p>{error ? "Unable to load projects. Please try again." : "Loading projects..."}</p>}{query && data && !results.length && <p>No matching projects.</p>}</div>;
}
export default function Header(){
 const [active,setActive]=useState<string|null>(null);const [mobile,setMobile]=useState(false);const pathname=usePathname();const ref=useRef<HTMLElement>(null);
 const close=()=>{setActive(null);setMobile(false);};
 useEffect(()=>{setActive(null);setMobile(false);},[pathname]);
 useEffect(()=>{const outside=(event:PointerEvent)=>{if(!ref.current?.contains(event.target as Node))setActive(null);};document.addEventListener("pointerdown",outside);return()=>document.removeEventListener("pointerdown",outside);},[]);
 return <header ref={ref} className={`reves-header ${pathname==="/"?"reves-header-home":""}`} onKeyDown={e=>{if(e.key==="Escape"){ref.current?.querySelector<HTMLButtonElement>('[aria-expanded="true"]')?.focus();close();}}}>
 <div className="reves-header-inner"><Link href="/" className="reves-wordmark" onClick={close}>Reves Foundation</Link>
 <button className="reves-menu-toggle" aria-expanded={mobile} aria-controls="main-navigation" onClick={()=>{setMobile(!mobile);setActive(null);}}>{mobile?"Close ×":"Menu ☰"}</button>
 <nav id="main-navigation" className={`reves-navigation ${mobile?"is-open":""}`} aria-label="Main navigation">{groups.map(g=><div className="reves-nav-group" key={g.label}><button aria-expanded={active===g.label} aria-controls={`nav-${g.label.replaceAll(" ","-")}`} onClick={()=>setActive(active===g.label?null:g.label)}>{g.label}<span aria-hidden="true">⌄</span></button>{active===g.label&&<div className="reves-nav-panel" id={`nav-${g.label.replaceAll(" ","-")}`}>{g.links.map(l=><Link key={l.href} href={l.href} onClick={close}>{l.label}<span aria-hidden="true">↗</span></Link>)}</div>}</div>)}</nav>
 <button className="reves-search-toggle" aria-expanded={active==="Search"} onClick={()=>setActive(active==="Search"?null:"Search")}>Search <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="2"/><path d="m16 16 6 6" stroke="currentColor" strokeWidth="2"/></svg></button>
 </div>{active==="Search"&&<SearchPanel close={close}/>}</header>;
}
