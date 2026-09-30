"use client";

import Image from "next/image";
import Link from "next/link";
import { useRevesProject } from "@/lib/hook";
import { pbUrl } from "@/lib/pocketbase.util";
import ContactUsSection from "./contact.section";

const focusAreas = [
  { number: "01", title: "Education & digital inclusion", text: "Opening doors through computer literacy, creative technology and practical learning.", image: "/images/projects/project-2.jpg", href: "/projects/4pl0x8grg1er9qv" },
  { number: "02", title: "Care & community", text: "Working alongside communities to support children, young people and families.", image: "/images/projects/big-smile-project.jpg", href: "/projects/j3fhhgfmav8nrwr" },
  { number: "03", title: "Confidence & well-being", text: "Creating space for young people to feel safe, discover their abilities and grow.", image: "/images/projects/project-3.jpg", href: "/projects/xfrple26m2zu5fd" },
];

export default function EditorialHome() {
  const { data: posts, error } = useRevesProject();
  return (
    <main className="reves-editorial">
      <section className="reves-hero">
        <div className="reves-hero-copy">
          <p className="reves-eyebrow">Rooted in Africa. Built on possibility.</p>
          <h1>Every young life.<br />An open <em>future.</em></h1>
          <p className="reves-intro">We work with marginalised children and young people to turn access to education, care and opportunity into lasting change.</p>
          <Link className="reves-button" href="/projects">Explore our work <span aria-hidden="true">↗</span></Link>
          <div className="reves-hero-note"><span>Rêves African Foundation</span><span>Youth & children development</span></div>
        </div>
        <div className="reves-hero-photo">
          <Image src="/about-us.webp" alt="Children and community members taking part in Reves Foundation activities" fill priority sizes="(max-width: 800px) 100vw, 55vw" />
          <div className="reves-photo-caption"><span>Small beginnings. Lasting possibilities.</span><span aria-hidden="true">01 —</span></div>
        </div>
      </section>

      <section className="reves-mission reves-wrap">
        <p className="reves-eyebrow">The future we believe in</p>
        <h2>Where you start<br className="reves-desktop-break" /> should never limit <em>how far you can go.</em></h2>
        <div className="reves-mission-bottom"><p>Every child deserves the chance to learn, belong and thrive. We bring that belief to life through education, skills development and community support.</p><Link className="reves-text-link" href="/about#mission">Our mission <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section className="reves-focus">
        <div className="reves-wrap">
          <div className="reves-section-heading"><div><p className="reves-eyebrow">Our focus</p><h2>Opportunity takes<br /><em>many forms.</em></h2></div><p>Connected programs.<br />One shared purpose: helping young people reach their potential.</p></div>
          <div className="reves-focus-grid">{focusAreas.map(area => <Link href={area.href} className="reves-focus-card" key={area.number}><div className="reves-card-photo"><Image src={area.image} alt={area.title} fill sizes="(max-width: 800px) 100vw, 33vw" /></div><div className="reves-card-heading"><span>{area.number}</span><span aria-hidden="true">↗</span></div><h3>{area.title}</h3><p>{area.text}</p></Link>)}</div>
        </div>
      </section>

      <section className="reves-story reves-wrap">
        <div className="reves-story-photo"><Image src="/images/projects/project-2.jpg" alt="Reves Foundation’s work with the community" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
        <div className="reves-story-copy"><p className="reves-eyebrow">Our story</p><h2>Change begins<br />with <em>showing up.</em></h2><p>Founded in November 2021, Rêves brings people together around a simple belief: young people can shape a better future when they have the support to begin.</p><p>From digital skills to community outreach, our work starts with listening and grows through partnership.</p><Link className="reves-text-link" href="/about">Get to know Rêves <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section id="projects" className="reves-updates">
        <div className="reves-wrap"><div className="reves-section-heading"><div><p className="reves-eyebrow">From our communities</p><h2>Stories of <em>possibility.</em></h2></div><Link className="reves-text-link" href="/projects">All projects <span aria-hidden="true">↗</span></Link></div>
          {error ? <p>Stories are temporarily unavailable. <Link className="reves-text-link" href="/#contact-us">Get in touch</Link></p> : !posts ? <p role="status">Loading stories…</p> : <div className="reves-updates-grid">{posts.slice(0, 3).map(post => <Link className="reves-update" href={`/projects/${post.id}`} key={post.id}><div className="reves-card-photo"><Image src={post.featuredImage ? `${pbUrl}api/files/${post.collectionId}/${post.id}/${post.featuredImage}` : "/images/projects/project-1.jpg"} alt={post.title} fill sizes="(max-width: 800px) 100vw, 33vw" /></div><p className="reves-eyebrow">Community stories</p><h3>{post.title}</h3><span className="reves-text-link">Read the story <span aria-hidden="true">↗</span></span></Link>)}</div>}
        </div>
      </section>

      <section className="reves-invitation"><div className="reves-wrap"><p className="reves-eyebrow">A part for all of us</p><h2>Be part of someone’s<br /><em>next chapter.</em></h2><p>Give your time. Share your skills. Support a young person’s future.</p><div className="reves-invitation-actions"><Link className="reves-button reves-button-light" href="https://flutterwave.com/donate/fqla2cajv8yi" target="_blank" rel="noopener noreferrer">Support our work <span aria-hidden="true">↗</span></Link><Link className="reves-text-link" href="https://forms.gle/qcjw4CUr63nfwV3K9" target="_blank" rel="noopener noreferrer">Become a volunteer <span aria-hidden="true">↗</span></Link></div></div></section>
      <ContactUsSection />
    </main>
  );
}
