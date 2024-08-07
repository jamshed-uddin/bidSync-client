import { HiOutlineBell } from "react-icons/hi2";
import Modal from "./Modal";
import useGetData from "../hooks/useGetData";
import useSingleUser from "../hooks/useSingleUser";
import NotificationList from "./NotificationList";
import { useRef, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Notifications = () => {
  const { singleUser } = useSingleUser();
  const [newNotifications, setNewNotifications] = useState(
    singleUser?.newNotifications
  );
  const axiosSecure = useAxiosSecure();
  const modalCloseRef = useRef(null);
  const {
    data: notifications,
    isLoading,
    error,
  } = useGetData("/notifications", !!singleUser?._id);

  const openModal = () => {
    document.getElementById("notifications").showModal();
  };

  const closeModal = () => {
    if (modalCloseRef.current) {
      console.log("button exists");
      modalCloseRef.current.click();
    }
  };

  const handleNotificationOpen = async () => {
    openModal();
    setNewNotifications(false);
    await axiosSecure.patch(`/user/${singleUser?._id}`, {
      newNotifications: false,
    });
  };

  return (
    <div
      onClick={handleNotificationOpen}
      className="relative cursor-pointer w-fit h-fit"
    >
      <Modal modalId={"notifications"} closeBtnRef={modalCloseRef}>
        <div>
          <h3 className="text-xl font-semibold">Notifications</h3>
          <NotificationList
            notifications={notifications}
            onClickFunc={closeModal}
          />
        </div>
      </Modal>

      <span className="relative ">
        {newNotifications && (
          <span className="block w-3 h-3 rounded-full bg-red-500 absolute right-0 top-0 border-2 border-white"></span>
        )}
        <HiOutlineBell size={25} />
      </span>
    </div>
  );
};

export default Notifications;
