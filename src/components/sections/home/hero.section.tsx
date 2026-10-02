"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect,useState } from "react";
const slides=[
 {title:"Empowering Africa’s Marginalized Youth", description:"We provide essential support, resources, and opportunities to youths to reach their full potential and become active members of their communities.", image:"/about-us.webp",cta:"Become a Global Champion",href:"https://forms.gle/qcjw4CUr63nfwV3K9",center:true},
 {title:"The Digital Literacy Project",description:"Teaching the children of JuliQuincy Orphanage Home IT Support and Digital awareness",image:"/images/projects/project-2.jpg",cta:"Explore Programs",href:"/projects/4pl0x8grg1er9qv",center:false},
 {title:"The Big Smile Project",description:"Feeding over 500 people at Kuchibuyi community Abuja",image:"/images/projects/big-smile-project.jpg",cta:"Read more",href:"/projects/j3fhhgfmav8nrwr",center:false}
];
export default function HeroSection(){
 const [current,setCurrent]=useState(0); const [playing,setPlaying]=useState(false);const [hovered,setHovered]=useState(false); const [reduced,setReduced]=useState(true);
 useEffect(()=>{const preference=window.matchMedia("(prefers-reduced-motion: reduce)");const update=()=>setReduced(preference.matches);update();preference.addEventListener("change",update);return()=>preference.removeEventListener("change",update);},[]);
 useEffect(()=>{if(!playing||hovered||reduced)return;const timer=setInterval(()=>setCurrent(n=>(n+1)%slides.length),7000);return()=>clearInterval(timer);},[playing,hovered,reduced]);
 const go=(n:number)=>{setCurrent((n+slides.length)%slides.length);setPlaying(false);};
 return <section className="reves-home-hero" aria-label="Featured programs" aria-roledescription="carousel" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setPlaying(false)}>
 <h1 className="sr-only">Reves Foundation</h1>
 <svg width="0" height="0" aria-hidden="true"><defs><clipPath id="reves-gate" clipPathUnits="objectBoundingBox"><path d="M .04 0 H .96 V .07 Q 1 .07 1 .14 V .86 Q 1 .93 .96 .93 V 1 H .04 V .93 Q 0 .93 0 .86 V .14 Q 0 .07 .04 .07 Z"/></clipPath></defs></svg>
 <div className="reves-hero-stage"><div className="reves-hero-slides" aria-live={playing?"off":"polite"}>{slides.map((s,i)=><div key={s.title} className={`reves-hero-slide ${i===current?"is-active":""}`} aria-hidden={i!==current}>
 <Image src={s.image} alt="" fill sizes="100vw" priority={i===0} className="reves-hero-image"/><div className="reves-hero-shade"/>
 <div className={`reves-hero-content ${s.center?"is-centered":""}`}><h2>{s.title}</h2><p>{s.description}</p><Link className="reves-button" href={s.href} tabIndex={i===current?0:-1}>{s.cta}</Link></div></div>)}</div>
 <div className="reves-gate-reveal" aria-hidden="true"/>
 <div className="reves-hero-controls">{slides.map((s,i)=><button key={s.title} aria-label={`Go to slide ${i+1}`} aria-pressed={i===current} onClick={()=>go(i)}><span/></button>)}<button aria-label="Previous slide" onClick={()=>go(current-1)}>↑</button><button aria-label="Next slide" onClick={()=>go(current+1)}>↓</button></div>
 <button className="reves-hero-play" aria-label={playing?"Pause slideshow":"Play slideshow"} onClick={()=>setPlaying(!playing)} disabled={!!reduced}>{playing?"Ⅱ":"▷"}</button>
 </div></section>;
}
