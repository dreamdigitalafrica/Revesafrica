import Image from "next/image";
import Link from "next/link";
export default function AboutUsSection(){return <section className="reves-mission reves-wrap">
 <h2>We envision a world where all African youth and children have <em>equal opportunities</em> to thrive and contribute to the development of their communities.</h2>
 <Link className="reves-button reves-button-outline" href="/about#mission">Our Mission</Link>
 <div className="reves-mission-links"><article><Image src="/images/projects/project-2.jpg" alt="Reves digital literacy project" width={500} height={320}/><div><h3>Our <em>Programs</em></h3><p>We provide essential support, resources, and opportunities to youths to reach their full potential and become active members of their communities.</p><Link className="reves-text-link" href="/projects">Explore Programs</Link></div></article>
 <article><Image src="/images/about-us-page-bg.jpeg" alt="Reves community outreach" width={500} height={320}/><div><h3>About <em>Us</em></h3><p>Founded in November 2021, Reves is a non-governmental organisation (NGO) dedicated to empowering vulnerable youth and children.</p><Link className="reves-text-link" href="/about#timeline">Our timeline</Link></div></article></div>
 </section>;}
