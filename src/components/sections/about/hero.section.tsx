import Image from "next/image";
import Link from "next/link";

const HeroSection = () => (
  <section className="reves-about-introduction container" aria-labelledby="about-title">
    <header className="reves-about-heading">
      <p>About Reves Foundation</p>
      <h1 id="about-title">My community service journey</h1>
    </header>
    <div className="reves-founder-story">
      <figure>
        <div className="reves-founder-headshot"><Image
          src="/images/team/chibuzo-portrait.png"
          alt="Chibuzo Ogbonnaya Chiemezo"
          width={1024}
          height={1024}
          sizes="(max-width: 780px) 200vw, 90vw"
          quality={90}
          priority
        /></div>
        <figcaption>
          <strong>Chibuzo Ogbonnaya Chiemezo</strong>
          <span>Co-founder and General Secretary</span>
        </figcaption>
      </figure>
      <div className="reves-founder-copy">
        <h2>Why I do this</h2>
        <p>My community service journey began when I was a little boy. I watched my mother feed homeless children in internally displaced people’s camps, and I always looked forward to helping her.</p>
        <p>In 2021, I came across Juli Quincy Orphanage Home in Kubwa, Abuja. I began to ask myself: What future awaits these children without parental care, guidance, or opportunities?</p>
        <p>This question sparked my first project, Beyond Dreams Orphanage Music Invasion. Together with talented friends, we taught over 30 children musical instruments, using music as a tool for healing, self-expression, and hope.</p>
        <p>I am committed to creating a world where social equity, digital inclusion, and mental well-being are prioritized.</p>
        <Link href="/programs" className="reves-text-link">Explore our work <span aria-hidden="true">↗</span></Link>
      </div>
    </div>
    <div className="reves-about-organisation">
      <h2>About us</h2>
      <p>Reves is a non-governmental organisation dedicated to empowering vulnerable youth and children, specifically those living in marginalised communities across Africa. We provide essential support, resources, and opportunities for youths to reach their full potential and become active members of their communities.</p>
    </div>
  </section>
);

export default HeroSection;
