import Image from "next/image";

const CertificationSection = () => {
  return (
    <section className="h-[520px] my-12 w-full overflow-hidden">
      <Image
        src={"/images/reves-foundation-certificate.webp"}
        alt="Reves foundation certificate"
        height={1920}
        width={980}
        className="h-full w-full object-contain"
      />
    </section>
  );
};

export default CertificationSection;
