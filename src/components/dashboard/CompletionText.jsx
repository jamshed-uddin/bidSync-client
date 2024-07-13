import useSingleUser from "../../hooks/useSingleUser";
import isProfileComplete from "../../utils/isProfileComplete";

import { PiWarning } from "react-icons/pi";

const CompletionText = () => {
  const { singleUser } = useSingleUser();

  if (isProfileComplete(singleUser)) {
    return null;
  }

  return (
    <div className="border border-red-500 bg-red-50 text-red-500 rounded-lg py-1 pl-1 text-lg">
      <h1 className="flex  items-center gap-1">
        <span>
          <PiWarning />
        </span>
        Complete you profile to list an auction.
      </h1>
    </div>
  );
};

export default CompletionText;
