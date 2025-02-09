import { Link } from "react-router-dom";
import heroImage from "../../assets/stonehenge.jpg";
import { MdArrowOutward } from "react-icons/md";

const Hero = () => {
  return (
    <div className="mt-14">
      <div className="mb-4">
        <h1 className="md:text-8xl text-5xl font-bold  pb-2 md:pb-5 font-baskervville ">
          Bid and claim <br />
          the Marvels
        </h1>
        <Link
          to={"/listings"}
          className="flex items-center text-sm lg:text-lg font-light underline  justify-end"
        >
          Explore more <MdArrowOutward />
        </Link>
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
