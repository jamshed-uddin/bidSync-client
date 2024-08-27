import { HiOutlineBell, HiXMark } from "react-icons/hi2";

import useGetData from "../hooks/useGetData";
import useSingleUser from "../hooks/useSingleUser";
import NotificationList from "./NotificationList";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import CustomModal from "./CustomModal";

const Notifications = () => {
  const { singleUser } = useSingleUser();
  const axiosSecure = useAxiosSecure();
  const [newNotifications, setNewNotifications] = useState(
    singleUser?.newNotifications
  );
  const [notifiModalOpen, setNotifiModalOpen] = useState(false);

  const {
    data: notifications,
    isLoading,
    error,
  } = useGetData("/notifications", !!singleUser?._id);

  const handleNotificationOpen = async () => {
    setNotifiModalOpen(true);
    setNewNotifications(false);
    await axiosSecure.patch(`/user/${singleUser?._id}`, {
      newNotifications: false,
    });
  };

  const closeModal = () => {
    setNotifiModalOpen(false);
  };

  return (
    <>
      <CustomModal
        isOpen={notifiModalOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
      >
        <div>
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Notifications</h3>
            <button onClick={closeModal} className="">
              <HiXMark size={25} />
            </button>
          </div>

          <NotificationList
            notifications={notifications}
            onClickFunc={closeModal}
          />
        </div>
      </CustomModal>
      <div
        onClick={handleNotificationOpen}
        className="relative cursor-pointer w-fit h-fit"
      >
        <span className="relative ">
          {newNotifications && (
            <span className="block w-3 h-3 rounded-full bg-red-500 absolute right-0 top-0 border-2 border-white"></span>
          )}
          <HiOutlineBell size={25} />
        </span>
      </div>
    </>
  );
};

export default Notifications;
