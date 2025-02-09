import { Link } from "react-router-dom";
import Button from "../components/Button";
import Title from "../components/Title";

const whySellWithBidSync = [
  {
    title: "Passionate buyers",
    description:
      "Over 10 million buyers around the world are waiting for your special object",
  },
  {
    title: "Expert guidance",
    description:
      "Our experts make sure you special object is ready to sell for a great price",
  },
  {
    title: "Easy payments",
    description:
      "Sell worry free with commited buyers, binding bids and a secure payment system",
  },
];
const howSellingWorks = [
  {
    title: "Tell you special objects's Story",
    description:
      "Show buyrs what makes your object such a great find with all the details and plenty of eye catching photos.One of our experts will virtually review your special object and if it meets our quality standards, place it in auction where the perfect buyers will find it",
  },
  {
    title: "We will find the perfect buyer",
    description:
      "We will find someone who loves your object as much as you do.All you have to do is sit back, relax and watch the bids roll in.Sell the way you want to with options to set a minimum price for certain objects, sell an entire collection and choose how you will ship",
  },
  {
    title: "Earn more, worry free",
    description:
      "The auction ends and it is time to pack up your special object and send it off to it's new home.We will collect from the buyer and keep it secure.Once delivery is confirmed, you get paid",
  },
];

const Sell = () => {
  return (
    <div className="space-y-7 mt-8">
      <div>
        <div>
          <h1 className="text-5xl lg:text-8xl  font-baskervville">
            Find the perfect buyer for your special object
          </h1>
        </div>
        <div className="mt-8">
          <Link to={"/dashboard/createAuction"}>
            <Button>Start selling</Button>
          </Link>
        </div>
      </div>
      <div className="py-8">
        <Title>Why sell on BidSync</Title>
        <div className="grid md:grid-cols-3 gap-4 mt-3">
          {whySellWithBidSync?.map((item, index) => (
            <div key={index} className="bg-gray-100 rounded-2xl px-4 py-8">
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p className="text-lg mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pb-8">
        <Title>How selling works</Title>

        <div className="grid md:grid-cols-3 gap-4 mt-3">
          {howSellingWorks?.map((item, index) => (
            <div key={index} className="bg-gray-100 rounded-2xl px-4 py-8">
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p className="text-lg mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sell;
