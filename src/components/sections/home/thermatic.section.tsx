import Image from "next/image";

const SDG_PILLARS = [
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
  {
    id: 3,
    title: "Quality Education",
    description:
      "Building schools and providing scholarships to deserving children across regions.",
    icon: "/images/sdg/quality-education.png",
  },
  {
    id: 4,
    title: "Gender Equality",
    description:
      "Advocating for girls' rights and ensuring equal access to leadership opportunities.",
    icon: "/images/sdg/gender-equality.png",
  },
  {
    id: 5,
    title: "Reduced Inequalities",
    description:
      "Fostering inclusive environments for children with disabilities and marginalized groups.",
    icon: "/images/sdg/reduced-inequalities.png",
  },
  {
    id: 6,
    title: "Partnerships",
    description:
      "Collaborating with global NGOs and local governments for maximum reach.",
    icon: "/images/sdg/partnerships.png",
  },
  {
    id: 7,
    title: "Peace & Justice",
    description:
      "Promoting safe spaces and youth advocacy programs for peaceful communities.",
    icon: "/images/sdg/peace-justice.png",
  },
  {
    id: 8,
    title: "Good Health",
    description:
      "Providing mobile clinics and essential healthcare education to rural areas.",
    icon: "/images/sdg/good-health.png",
  },
];

const PillarCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) => (
  <div className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
    {/* Icon box */}
    <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
      <Image
        src={icon}
        alt={`${title} Icon`}
        width={192}
        height={192}
        className="object-cover"
        loading="lazy"
      />
    </div>
    <div className="flex flex-col gap-1.5">
      <h3 className="font-bold text-gray-900 text-lg leading-snug">{title}</h3>
      <p className="text-base text-gray-500 leading-relaxed">{description}</p>
    </div>
  </div>
);

const ThematicSection = () => {
  return (
    <section className="bg-[#f4f6fb] py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 px-4 md:px-8">
        <p className="text-[#3AF40C] text-xs font-bold uppercase tracking-widest mb-3">
          Our Strategic Pillars
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Aligned with Global Goals
        </h2>
        <p className="text-gray-500 text-base leading-relaxed">
          We structure our programs to directly address the United Nations
          Sustainable Development Goals, ensuring a holistic approach to child
          and youth welfare in Africa.
        </p>
      </div>

      {/* Grid */}
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-4">
        {SDG_PILLARS.map((pillar) => (
          <PillarCard
            key={pillar.id}
            title={pillar.title}
            description={pillar.description}
            icon={pillar.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default ThematicSection;
