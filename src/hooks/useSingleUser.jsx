import useAuth from "./useAuth";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSingleUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: singleUser,
    isLoading: singleUserLoading,
    refetch: singleUserRefetch,
  } = useQuery({
    queryKey: ["singleUser", user],
    queryFn: async () => {
      const result = await axiosSecure.get(`/user/${user?.email}`);
      return result?.data?.data;
    },
    enabled: !!user,
  });

  return { singleUser, singleUserLoading, singleUserRefetch };
};

export default useSingleUser;
