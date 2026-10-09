import Image from "next/image";

const SDG_PILLARS = [
  {
    id: 4,
    title: "Quality Education",
    description:
      "Building schools and providing scholarships to deserving children across regions.",
    icon: "/images/sdg/quality-education.png",
  },
  {
    id: 3,
    title: "Good Health and Well-being",
    description:
      "Providing mobile clinics and essential healthcare education to rural areas.",
    icon: "/images/sdg/good-health.png",
  },
  {
    id: 1,
    title: "No Poverty",
    description:
      "Empowering families with financial literacy and sustainable livelihood support.",
    icon: "/images/sdg/no-poverty.png",
  },
  {
    id: 2,
    title: "Zero Hunger",
    description:
      "Implementing community-led nutrition programs and agricultural education.",
    icon: "/images/sdg/zero-hunger.png",
  },
];

const ThematicSection = () => {
  return (
    <section className="reves-original-pillars" aria-labelledby="sdg-heading">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 px-4 md:px-8">
        <p className="text-[#0C529C] text-xs font-bold uppercase tracking-widest mb-3">
          Our Strategic Pillars
        </p>
        <h2 id="sdg-heading" className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Aligned with Global Goals
        </h2>
        <p className="text-gray-500 text-base leading-relaxed">
          We structure our programs to directly address the United Nations
          Sustainable Development Goals, ensuring a holistic approach to child
          and youth welfare in Africa.
        </p>
      </div>

      <ul className="reves-sdg-grid">
        {SDG_PILLARS.map((pillar) => (
          <li key={pillar.id} className="reves-sdg-card">
            <Image
              src={pillar.icon}
              alt={`Sustainable Development Goal ${pillar.id}: ${pillar.title}`}
              width={144}
              height={144}
              className="reves-sdg-icon"
              sizes="144px"
            />
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ThematicSection;
