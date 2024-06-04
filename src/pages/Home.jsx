import EasyBids from "../components/home/EasyBids";
import EndingSoon from "../components/home/EndingSoon";
import Hero from "../components/home/Hero";
import IconicBrands from "../components/home/IconicBrands";
import RecommendedCategory from "../components/home/RecommendedCategory";
import SellWithBidSync from "../components/home/SellWithBidSync";

const Home = () => {
  return (
    <div className="space-y-8">
      <Hero />
      <EndingSoon />
      <RecommendedCategory />
      <EasyBids />
      <SellWithBidSync />
      <IconicBrands />
    </div>
  );
};

export default Home;
