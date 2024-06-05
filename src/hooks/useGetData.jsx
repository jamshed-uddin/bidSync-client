import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useGetData = (endpoint, enabled = true) => {
  const axiosSecure = useAxiosSecure();
  const queryKey = [endpoint];
  const fetchData = async () => {
    try {
      const result = await axiosSecure.get(`${endpoint}`);

      return result?.data.data;
    } catch (error) {
      throw Error(error);
    }
  };

  return useQuery({ queryKey, queryFn: fetchData, enabled: enabled });
};

export default useGetData;
