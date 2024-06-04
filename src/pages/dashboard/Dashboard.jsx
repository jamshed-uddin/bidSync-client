import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { HiBars3BottomLeft, HiOutlineXMark } from "react-icons/hi2";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, userLogout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleUserLogout = async () => {
    await userLogout();
    navigate("/");
  };

  console.log(user);
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="md:flex  m-2 md:m-0 max-h-screen overflow-y-auto">
      <div
        className={`bg-gray-200 shrink-0 w-fit pl-8 pr-5  h-screen  absolute  top-0 bottom-0 z-50 transition-all duration-500 md:sticky md:top-0 md:left-0 md:bottom-0 ${
          menuOpen ? "left-0" : "-left-56"
        }  `}
      >
        <div className=" mb-2  flex flex-col   h-full ">
          <div className="text-end text-xl md:hidden font-bold ">
            <button className="pt-2" onClick={() => setMenuOpen(false)}>
              <HiOutlineXMark className="w-7 h-7" />
            </button>
          </div>
          <ul className="text-xl  font-semibold  pt-3 md:pt-10 flex-grow space-y-2 ">
            <li>
              <Link to={"/dashboard/profile"}>Profile</Link>
            </li>
            <li>
              <Link to={"/dashboard/myListings"}>My listings</Link>
            </li>
            <li>
              <Link to={"/dashboard/myBids"}>My bids</Link>
            </li>
            <li>
              <Link to={"/dashboard/createAuction"}>Add auction</Link>
            </li>
          </ul>

          <ul className="text-xl  font-semibold space-y-2 mb-6 ">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li className="cursor-pointer" onClick={handleUserLogout}>
              Logout
            </li>
          </ul>
        </div>
      </div>

      {/* outlet */}
      <div className="flex-grow px-3">
        <div className=" flex gap-2 items-center">
          <button className="md:hidden" onClick={() => setMenuOpen(true)}>
            <HiBars3BottomLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
        </div>
        <div className="mt-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
