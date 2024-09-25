import Link from "next/link";

interface SupportUsSectionProps {}

const SupportUsSection = ({}: SupportUsSectionProps) => {
  return (
    <section className="container py-8" id="support">
      <div className="bg-bluen w-full py-12 text-white rounded-xl flex items-center flex-col gap-4 px-4 text-center justify-center">
        <h2 className="text-white mb-2 text-2xl lg:text-4xl font-medium">
          Support us so we can be an even greater blessing to others.
        </h2>
        <Link
          href="https://flutterwave.com/donate/fqla2cajv8yi?_gl=1%2ahjgupl%2a_gcl_au%2aMTU1MDEzNzk2NC4xNzI1ODk5NjE0%2a_ga%2aMTQzMjAwNzc2MC4xNzIzMTE3MzM3%2a_ga_KQ9NSEMFCF%2aMTcyNTg5OTIwMy4yLjEuMTcyNTkwMDA1Ny41OS4wLjA."
          target="_blank"
        >
          <button className="bg-white rounded-full font-medium md:text-lg text-bluen px-8 py-2">
            Donate
          </button>
        </Link>
      </div>
    </section>
  );
};

export default SupportUsSection;
