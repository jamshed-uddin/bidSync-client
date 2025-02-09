import { useState } from "react";
import CustomModal from "../CustomModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useSingleUser from "../../hooks/useSingleUser";
import toast, { Toaster } from "react-hot-toast";
import Button from "../Button";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiOutlineEye } from "react-icons/hi";

const ItemDeleteEdit = ({ item }) => {
  const axiosSecure = useAxiosSecure();
  const { singleUser } = useSingleUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAuctionDelete = async () => {
    try {
      await axiosSecure.delete(`/listings/${item._id}`);
      toast.success("Auction deleted.");
      closeDialog();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  if (item?.user?._id !== singleUser?._id) {
    return null;
  }

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />
      {/* modal for deleting confirmation */}
      <CustomModal
        isOpen={isDialogOpen}
        onRequestClose={closeDialog}
        shouldCloseOnOverlayClick={false}
      >
        <div>
          <h1 className="text-2xl">
            Are you sure you want to delete this auction?
          </h1>
          <span className="text-red-500 text-sm ">
            Note: This action cannot be reversed.
          </span>
          <div className="text-end space-x-4 mt-4">
            <Button clickFunc={handleAuctionDelete}>Delete</Button>
            <Button style={"bordered"} clickFunc={closeDialog}>
              Cancel
            </Button>
          </div>
        </div>
      </CustomModal>

      {/* edit and delete button for dashbaord and item seller only */}

      <div className="flex items-center gap-4 ">
        <Link
          className=" active:scale-95 "
          to={`/listings/${item?._id}`}
          replace
        >
          <HiOutlineEye size={25} />
        </Link>
        <Link
          className="  active:scale-95 "
          to={`/dashboard/editAuction/${item?._id}`}
          replace
        >
          <FiEdit size={20} />
        </Link>

        <span
          onClick={() => setIsDialogOpen(true)}
          className="  text-red-600  rounded-lg  cursor-pointer active:scale-95 shadow-xl"
        >
          <FaRegTrashCan size={20} />
        </span>
      </div>
    </div>
  );
};

export default ItemDeleteEdit;
