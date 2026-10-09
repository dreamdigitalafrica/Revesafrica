"use client";

import Image from "next/image";
import InstagramFeed from "./instagram-feed";
import { useState } from "react";
import Link from "next/link";
import { useRevesProject } from "@/lib/hook";
import { pbUrl } from "@/lib/pocketbase.util";

const strategies = [
  { id: "education", goal: 4, title: "Quality Education", icon: "quality-education", description: "Equip young adults, particularly girls and people with disabilities, with digital skills to compete equally with their peers and earn a sustainable living.", projects: ["4pl0x8grg1er9qv"] },
  { id: "health", goal: 3, title: "Good Health and Well-being", icon: "good-health", description: "Mental health awareness campaign for schools within Abuja Nigeria", projects: ["xfrple26m2zu5fd"] },
  { id: "poverty", goal: 1, title: "No Poverty", icon: "no-poverty", description: "Empowering families with financial literacy and sustainable livelihood support.", projects: ["0oazw62uxxbfenh", "qrq2q2f5o1kz9oy"] },
  { id: "hunger", goal: 2, title: "Zero Hunger", icon: "zero-hunger", description: "Implementing community-led nutrition programs and agricultural education.", projects: ["j3fhhgfmav8nrwr", "qrq2q2f5o1kz9oy"] },
];

export default function OurWork() {
  const { data: posts, error, mutate } = useRevesProject();
  const [openStrategy, setOpenStrategy] = useState<string | null>(null);
  return (
    <main className="reves-work-page">
      <header className="reves-work-intro reves-work-wrap">
        <p className="reves-work-eyebrow">Reves Foundation</p>
        <h1>Our work</h1>
        <p>Empowering marginalised African youth and children through education, holistic well-being, skills development, and access to economic opportunities.</p>
      </header>
      <nav className="reves-work-panels reves-work-wrap" aria-label="Explore our program areas">
        {strategies.map(strategy => {
          const post = strategy.projects.map(id => posts?.find(post => post.id === id && post.featuredImage)).find(Boolean);
          const photo = post ? `${pbUrl}api/files/${post.collectionId}/${post.id}/${post.featuredImage}` : undefined;
          return (
            <a key={strategy.id} className={`reves-work-panel${photo ? " has-photo" : ""}`} href={`#${strategy.id}`} onClick={() => setOpenStrategy(strategy.id)}>
              <Image src={photo || `/images/sdg/${strategy.icon}.png`} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw" className={photo ? "reves-work-photo" : "reves-work-symbol"} />
              <i className="reves-work-gates" aria-hidden="true" /><span className="reves-work-panel-label"><small>SDG {strategy.goal}</small>{strategy.title}<span aria-hidden="true">↗</span></span>
            </a>
          );
        })}
      </nav>
      <section id="program_strategies" className="reves-work-strategies reves-work-wrap" aria-labelledby="strategies-title">
        <h2 id="strategies-title">Program strategies</h2>
        <p className="reves-work-lead">Our goal is to identify and address unique challenges facing marginalised youths and children, designing need-based interventions and programmes that empower them to become active contributors to their communities.</p>
        {error && <p role="alert">Projects could not be loaded. <button type="button" className="reves-text-link" onClick={() => void mutate()}>Try again</button></p>}
        {strategies.map(strategy => (
          <div className={`reves-work-strategy${openStrategy === strategy.id ? " is-open" : ""}`} id={strategy.id} key={strategy.id}>
            <h3><button type="button" id={`${strategy.id}-toggle`} aria-expanded={openStrategy === strategy.id} aria-controls={`${strategy.id}-content`} onClick={() => setOpenStrategy(openStrategy === strategy.id ? null : strategy.id)}><span>{strategy.title}</span><span className="reves-work-toggle" aria-hidden="true" /></button></h3>
            <div className="reves-work-accordion" id={`${strategy.id}-content`} role="region" aria-labelledby={`${strategy.id}-toggle`} aria-hidden={openStrategy !== strategy.id}><div className="reves-work-accordion-inner">
            <div className="reves-work-strategy-body">
              <div><p className="reves-work-eyebrow">Sustainable Development Goal {strategy.goal}</p><p>{strategy.description}</p></div>
              <ul aria-label={`${strategy.title} projects`}>
                {!posts && !error && <li>Loading projects…</li>}
                {posts?.filter(post => strategy.projects.includes(post.id)).map(post => <li key={post.id}><Link href={`/projects/${post.id}`} tabIndex={openStrategy === strategy.id ? 0 : -1}>{post.title}<span aria-hidden="true">↗</span></Link><p>{post.description}</p></li>)}
              </ul>
            </div>
            </div></div>
          </div>
        ))}
      </section>
      <section className="reves-work-more reves-work-wrap" aria-labelledby="more-work-title">
        <h2 id="more-work-title">More about our work</h2>
        <div><Link href="/projects">All projects <span aria-hidden="true">↗</span></Link><Link href="/about#mission">Our mission <span aria-hidden="true">↗</span></Link><Link href="/#contact-us">Partner with us <span aria-hidden="true">↗</span></Link></div>
      </section>
      <InstagramFeed />
    </main>
  );
}
