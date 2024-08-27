import AuctionChart from "../../components/dashboard/AuctionChart";
import Metrics from "../../components/dashboard/Metrics";

const Overview = () => {
  return (
    <div className="space-y-4">
      <Metrics />
      <AuctionChart />
    </div>
  );
};

export default Overview;
