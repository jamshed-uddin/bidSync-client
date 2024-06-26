import useAxiosSecure from "./useAxiosSecure";
import useGetData from "./useGetData";
import useAuth from "./useAuth";

const useSaveUnsave = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data,
    isLoading: savedItemLoading,
    error: savedItemError,
  } = useGetData(`/savedItems`, !!user);

  const isSaved = (id) => {
    const savedItems = data?.map((item) => item.auction);
    const savedItemsId = savedItems?.map((item) => item._id);
    if (savedItemsId?.includes(id)) {
      return true;
    } else {
      return false;
    }
  };
  const handleAuctionSaveUnsave = async (id, save) => {
    try {
      if (save) {
        const result = await axiosSecure.post("/savedItems", { auction: id });
        return result?.data;
      } else {
        const result = await axiosSecure.delete(`/savedItems/${id}`);
        return result.data;
      }
    } catch (error) {
      return error;
    }
  };

  return {
    handleAuctionSaveUnsave,
    savedItems: data?.map((item) => item.auction),
    isSaved,
    savedItemLoading,
    savedItemError,
  };
};

export default useSaveUnsave;
