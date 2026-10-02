"use client";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import { useRevesProject } from "@/lib/hook";
import { pbUrl } from "@/lib/pocketbase.util";
// Groupings use the existing project descriptions and the Big Smile initiative.
const topics: Record<string,string[]> = {
 "Digital literacy": ["4pl0x8grg1er9qv"],
 "Community outreach": ["0oazw62uxxbfenh","j3fhhgfmav8nrwr","qrq2q2f5o1kz9oy"],
 "Mental health": ["xfrple26m2zu5fd"],
};
export default function ProjectsSection(){
 const {data:posts,error}=useRevesProject();const [category,setCategory]=useState("All projects");const [index,setIndex]=useState(0);
 const categories=["All projects",...Object.keys(topics)];
 const filtered=(posts??[]).filter(p=>category==="All projects"||topics[category]?.includes(p.id));const start=Math.min(index,Math.max(0,filtered.length-2));
 return <section className="reves-project-stories" id="projects"><div className="reves-wrap"><div className="reves-section-heading"><h2>Our Recent Impact</h2><Link className="reves-text-link" href="/projects">Explore Programs →</Link></div>
 <div className="reves-stories-layout"><div className="reves-story-categories" aria-label="Project categories">{categories.map(c=><button key={c} aria-pressed={c===category} onClick={()=>{setCategory(c);setIndex(0);}}>{c}</button>)}</div>
 <div><div className="reves-story-grid" aria-live="polite">{!posts?<p>{error?"Unable to load projects. Please refresh the page.":"Loading projects..."}</p>:filtered.length===0?<p>No projects available.</p>:filtered.slice(start,start+2).map(p=><article key={p.id} className="reves-story-card"><Link href={`/projects/${p.id}`}><div className="reves-story-image"><Image src={p.featuredImage?`${pbUrl}api/files/${p.collectionId}/${p.id}/${p.featuredImage}`:"/about-us.webp"} alt="" fill sizes="(max-width: 780px) 100vw, 35vw"/></div><h3>{p.title}</h3></Link>{p.description&&<p>{p.description}</p>}</article>)}</div>
 <div className="reves-story-controls"><button aria-label="Previous projects" disabled={start===0} onClick={()=>setIndex(Math.max(0,start-2))}>←</button><button aria-label="Next projects" disabled={start+2>=filtered.length} onClick={()=>setIndex(Math.min(start+2,Math.max(0,filtered.length-2)))}>→</button></div></div></div></div></section>;
}
