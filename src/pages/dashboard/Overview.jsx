import AuctionChart from "../../components/dashboard/AuctionChart";
import Metrics from "../../components/dashboard/Metrics";
import useSingleUser from "../../hooks/useSingleUser";

const Overview = () => {
  const { singleUser } = useSingleUser();
  return (
    <div className="space-y-4">
      {singleUser?.name && (
        <div>
          <h2 className="text-lg font-semibold">Hello, {singleUser?.name}</h2>
        </div>
      )}
      <Metrics />
      <AuctionChart />
    </div>
  );
};

export default Overview;
