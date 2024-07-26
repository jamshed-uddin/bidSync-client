import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { HiBars3BottomLeft, HiOutlineXMark } from "react-icons/hi2";
import { IoTrophyOutline, IoCardOutline, IoHomeOutline } from "react-icons/io5"; //myListings, won bids , payments
import { VscGraph } from "react-icons/vsc"; //overview
import { PiGavel } from "react-icons/pi"; //mybids
import { GoTasklist } from "react-icons/go"; //manage listings
import { LiaShippingFastSolid } from "react-icons/lia"; //shippig
import { FiUser } from "react-icons/fi"; //account
import { BsFileEarmarkPlus } from "react-icons/bs"; //add auction
import { TbLogout2 } from "react-icons/tb";
import isProfileComplete from "../../utils/isProfileComplete";
import useSingleUser from "../../hooks/useSingleUser";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userLogout } = useAuth();
  const { singleUser } = useSingleUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  const handleUserLogout = async () => {
    await userLogout();
    navigate("/");
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const activeRouteStyle = (routeName) => {
    if (pathname.toLowerCase().includes(routeName.toLowerCase())) {
      return "border-l-2 border-black bg-gray-50 rounded-sm";
    } else {
      return "border-l-2 border-transparent";
    }
  };

  const linkStyle = "flex items-center gap-2 pl-2 ";

  return (
    <div className="md:flex  md:m-0 max-h-screen overflow-y-auto">
      <div
        className={`bg-gray-100 shrink-0 w-2/3 md:w-[30%] lg:w-[20%] pl-8 pr-5  h-screen  absolute  top-0 bottom-0 z-50 transition-all duration-500 lg:sticky lg:top-0 lg:left-0 lg:bottom-0 shadow-xl ${
          menuOpen ? "left-0" : "-left-80"
        }  `}
      >
        <div className=" mb-2  flex flex-col   h-full ">
          <div className="text-end text-xl lg:hidden font-bold ">
            <button className="pt-2" onClick={() => setMenuOpen(false)}>
              <HiOutlineXMark className="w-7 h-7" />
            </button>
          </div>
          <ul className="text-xl   pt-3 md:pt-10 flex-grow space-y-3 ">
            <li>
              <Link
                to={"/dashboard/overview"}
                className={` ${activeRouteStyle("overview")} ${linkStyle}`}
              >
                <VscGraph />
                Overview
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/myListings"}
                className={` ${activeRouteStyle("mylistings")} ${linkStyle}`}
              >
                <GoTasklist /> My Listings
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/myBids"}
                className={` ${activeRouteStyle("mybids")} ${linkStyle}`}
              >
                <PiGavel /> My Bids
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/wonAuctions"}
                className={` ${activeRouteStyle("wonauctions")} ${linkStyle}`}
              >
                <IoTrophyOutline /> Won Auctions
              </Link>
            </li>

            <li>
              <Link
                to={"/dashboard/createAuction"}
                className={` ${activeRouteStyle("createAuction")} ${linkStyle}`}
              >
                <BsFileEarmarkPlus /> Add Auction
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/payments"}
                className={` ${activeRouteStyle("payments")} ${linkStyle}`}
              >
                <IoCardOutline /> Payments
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/shipping"}
                className={` ${activeRouteStyle("shipping")} ${linkStyle}`}
              >
                <LiaShippingFastSolid /> Shipping
              </Link>
            </li>

            <li className="relative">
              {!isProfileComplete(singleUser) && (
                <span className="w-2 h-2 rounded-full bg-red-500 block absolute right-0 top-0"></span>
              )}
              <Link
                to={"/dashboard/profile"}
                className={`${activeRouteStyle("profile")} ${linkStyle}`}
              >
                <FiUser /> Profile
              </Link>
            </li>
          </ul>

          <ul className="text-xl   space-y-3 pb-6">
            <li>
              <Link to={"/"} className={linkStyle}>
                <IoHomeOutline /> Home
              </Link>
            </li>
            <li
              className={`cursor-pointer ${linkStyle}`}
              onClick={handleUserLogout}
            >
              <TbLogout2 /> Logout
            </li>
          </ul>
        </div>
      </div>

      {/* outlet */}
      <div className="shrink-0 px-3 lg:w-[80%]">
        <div className=" flex gap-2 items-center">
          <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
            <HiBars3BottomLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold  pt-2 lg:px-4">Dashboard</h1>
          </div>
        </div>
        <div className="mt-3 lg:px-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
