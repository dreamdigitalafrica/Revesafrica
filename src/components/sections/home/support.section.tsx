import Link from "next/link";

interface SupportUsSectionProps {}

const SupportUsSection = ({}: SupportUsSectionProps) => {
  return (
    <section
      className="px-4 container flex justify-center md:px-14"
      id="support"
    >
      <div className="bg-bluen w-full py-8 md:py-20 text-white rounded-3xl flex items-center flex-col space-y-4 px-4 text-center justify-center md:space-y-8">
        <h2 className="w-full text-gray-200 mx-auto text-2xl md:text-5xl font-semibold md:w-4/5">
          Support us so we can be an even greater blessing to others.
        </h2>

        <Link
          href="https://flutterwave.com/donate/fqla2cajv8yi?_gl=1%2ahjgupl%2a_gcl_au%2aMTU1MDEzNzk2NC4xNzI1ODk5NjE0%2a_ga%2aMTQzMjAwNzc2MC4xNzIzMTE3MzM3%2a_ga_KQ9NSEMFCF%2aMTcyNTg5OTIwMy4yLjEuMTcyNTkwMDA1Ny41OS4wLjA."
          target="_blank"
        >
          <button className="bg-white mt-4 rounded-full font-bold md:text-lg transition text-bluen px-12 py-4 hover:scale-105 shadow-sm drop-shadow-md">
            Donate
          </button>
        </Link>
      </div>
    </section>
  );
};

export default SupportUsSection;
