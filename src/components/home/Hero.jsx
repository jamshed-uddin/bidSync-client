import heroImage from "../../assets/Fujishima-Takeji-Sunrise-over-the-Eastern-Sea-detail.jpg";

const Hero = () => {
  return (
    <div className="mt-24">
      <div>
        <h1 className="md:text-8xl text-5xl font-bold text-center pb-2 md:pb-5 ">
          Bid and claim the best from BidSync
        </h1>
      </div>
      <div className="lg:h-screen">
        <img
          className="h-full w-full"
          src={heroImage}
          alt="Image of art work on landing page banner"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Hero;
