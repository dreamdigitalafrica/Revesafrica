import Link from "next/link";
import { MdFavorite } from "react-icons/md";

const CTASection = () => {
  const funded = 72;

  return (
    <section className="reves-original-cta px-4 md:px-8 py-12">
      <div className="max-w-5xl mx-auto bg-[#0d1117] rounded-3xl px-8 py-12 md:px-14 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left — copy + buttons */}
        <div className="flex flex-col gap-6 md:gap-8">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl  md:text-4xl font-extrabold text-white leading-tight">
            Ready to Make a <br className="hidden md:block" />
            Lasting Impact?
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-sm">
            Your support helps us provide education, healthcare, and nutrition
            to thousands of children. Join our global community of
            change-makers.
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="https://flutterwave.com/donate/fqla2cajv8yi"
              target="_blank"
              className="bg-[#3AF40C] text-gray-900 font-bold px-8 py-4 rounded-xl hover:brightness-90 transition-all text-base"
            >
              Donate Now
            </Link>
            <Link
              href="https://forms.gle/qcjw4CUr63nfwV3K9"
              target="_blank"
              className="bg-white text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all text-base"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>

        {/* Right — impact goal card */}
        <div className="flex justify-center md:justify-end">
          <div className="bg-[#1a2035] rounded-2xl p-6 md:p-8 w-full flex flex-col gap-6">
            {/* Icon + label + goal text */}
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-xl bg-[#3AF40C] flex items-center justify-center flex-shrink-0">
                <MdFavorite size={22} className="text-gray-900" />
              </div>
              <div className="flex flex-col gap-2 border border-blue-500/40 rounded-lg px-3 py-2 flex-1">
                <p className="text-gray-400 font-medium">Impact Goal</p>
                <p className="text-white font-semibold leading-snug">
                  Help us reach 1,000 more children this year.
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex flex-col gap-2">
              <div className="w-full h-2.5 bg-[#0d1117] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3AF40C] rounded-full transition-all duration-700"
                  style={{ width: `${funded}%` }}
                />
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-white">{funded}% Funded</span>
                <span className="text-gray-400">$28k to go</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
