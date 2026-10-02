import Link from "next/link";

// Verbatim excerpts from the existing About page and published project records.
// See TIMELINE-SOURCES.md for provenance and publication-date limitations.
const milestones = [
  {
    date: "November 2021", title: "Founded in November 2021",
    text: "Founded in November 2021, Reves is a non-governmental organisation(NGO) dedicated to empowering vulnerable youth and children, specifically those living in marginalised communities across Africa.",
    href: "/about", source: "About Us",
  },
  {
    date: "2021–2024", title: "Community Outreach & Empowerment Project",
    text: "Since November 2021, Reves has led an annual outreach transforming lives across Gbazango, Kagini, and Byazhin communities in Abuja and Nasarawa.",
    href: "/projects/0oazw62uxxbfenh", source: "Community Outreach and empowerment network",
  },
  {
    date: "2022", title: "Don't Bully me Campaign (Mental Health Matter)",
    text: "The project's mission is to prevent bullying, promote empathy, and create safe and inclusive environments for all children by raising awareness, providing education, and empowering young people and school authorities to stand up against bullying.",
    href: "/projects/xfrple26m2zu5fd", source: "Read the project", published: "Published 24 September 2022 · Event date unconfirmed",
  },
  {
    date: "2024", title: "The Big Smile Project",
    text: "The Big Smile Project was a community outreach initiative aimed at bringing joy and relief to the women and children of Kuchimbuyi Community.",
    href: "/projects/j3fhhgfmav8nrwr", source: "Read the project", published: "Published 10 October 2024 · Event date unconfirmed",
  },
  {
    date: "2024", title: "The Digital Literacy Project",
    text: "REVES partnered with Juli Quinty Orphanage Home Bazango Kubwa, Divine Hope Orphanage Home Kagini, and Ark of Refuge Phase 4 Kubwa to equip young minds with digital skills.",
    href: "/projects/4pl0x8grg1er9qv", source: "Read the project", published: "Published 23 October 2024 · Event date unconfirmed",
  },
  {
    date: "2026", title: "2026 Sallah Community Development and Welfare Support Outreach",
    text: "The landmark outreach was implemented through a strategic partnership between Reves African Youth and Children Development Foundation and Diamond New Energy LTD, one of West Africa’s leading lithium mining companies, renowned for its strong commitment to corporate social responsibility and community advancement.",
    href: "/projects/qrq2q2f5o1kz9oy", source: "Read the project", published: "Published 28 May 2026",
  },
];

export default function TimelineSection() {
  return <section className="reves-timeline" id="timeline" aria-labelledby="timeline-heading">
    <div className="reves-timeline-heading"><span>About Us</span><h2 id="timeline-heading">Our timeline</h2></div>
    <ol>{milestones.map(milestone => <li key={milestone.title}>
      <div className="reves-timeline-date">{milestone.date}</div>
      <div className="reves-timeline-entry"><h3>{milestone.title}</h3><p>{milestone.text}</p><Link href={milestone.href}>{milestone.source} <span aria-hidden="true">↗</span></Link>{milestone.published && <small>{milestone.published}</small>}</div>
    </li>)}</ol>
  </section>;
}
