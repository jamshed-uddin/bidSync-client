import useAuth from "./useAuth";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";

const useSingleUser = () => {
  const { user } = useAuth();

  const { data: singleUser } = useQuery({
    queryKey: ["singleUser", user],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_baseUrl}/user/${user?.email}`
      );
      return result?.data;
    },
    enabled: !!user,
  });

  return { singleUser };
};

export default useSingleUser;
