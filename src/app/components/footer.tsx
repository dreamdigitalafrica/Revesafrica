interface FooterProps {}

const Footer = ({}: FooterProps) => {
  return (
    <footer
      className="relative h-max"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative bottom-0">
        <div className="h-max sticky bottom-0 text-white bg-black">
          <div className="flex shrink-0 gap-20 container py-8">
            <div className="flex flex-col gap-2">
              <h3 className="mb-2 uppercase text-[#ffffff80]">About</h3>
              <p>Home</p>
              <p>Projects</p>
              <p>Our Mission</p>
              <p>Contact Us</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="mb-2 uppercase text-[#ffffff80]">Education</h3>
              <p>News</p>
              <p>Learn</p>
              <p>Certification</p>
              <p>Publications</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
