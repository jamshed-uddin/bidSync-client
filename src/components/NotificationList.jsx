import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import calculateTime from "../utils/calculateTime";

const NotificationList = ({ notifications, onClickFunc }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [itemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);

  const navigateToAuction = (link) => {
    onClickFunc();
    navigate(link);
  };

  return (
    <div className="text-lg mt-4">
      {!user || !notifications?.length ? (
        <h3>You do not have any notification yet.</h3>
      ) : (
        <>
          <ul className="  space-y-1 divide-y-[1.2px] divide-gray-400">
            {notifications
              ?.slice(
                itemPerPage * pageNum - itemPerPage,
                pageNum * itemPerPage
              )
              .map((notification) => (
                <li
                  key={notification._id}
                  className=" py-2 cursor-pointer"
                  onClick={() => navigateToAuction(notification?.link)}
                >
                  {notification?.message}
                  <span className="block text-sm">
                    {calculateTime(notification?.createdAt)}
                  </span>
                </li>
              ))}
          </ul>
          {notifications?.length > itemPerPage && (
            <h2 className="flex gap-4 justify-end items-center mt-3">
              <button
                disabled={pageNum === 1}
                onClick={() => setPageNum((p) => p - 1)}
                className={`disabled:opacity-70`}
              >
                Prev
              </button>
              <button
                disabled={
                  pageNum * itemPerPage > notifications?.length ||
                  pageNum * itemPerPage === notifications?.length
                }
                onClick={() => setPageNum((p) => p + 1)}
                className={`disabled:opacity-70`}
              >
                Next
              </button>
            </h2>
          )}
        </>
      )}
    </div>
  );
};

export default NotificationList;
