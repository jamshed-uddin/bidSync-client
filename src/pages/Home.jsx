import EasyBids from "../components/home/EasyBids";
import EndingSoon from "../components/home/EndingSoon";
import Hero from "../components/home/Hero";
import IconicBrands from "../components/home/IconicBrands";
import SellWithBidSync from "../components/home/SellWithBidSync";

const Home = () => {
  return (
    <div className="space-y-10">
      <Hero />
      <EndingSoon />
      <SellWithBidSync />
      <EasyBids />
      <IconicBrands />
    </div>
  );
};

export default Home;
