import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { HiBars3BottomLeft, HiOutlineXMark } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5"; //myListings, won bids , payments
//add auction
import { TbLogout2 } from "react-icons/tb";
import SideNavLinks from "../../components/dashboard/SideNavLinks";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userLogout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleUserLogout = async () => {
    await userLogout();
    navigate("/");
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const linkStyle = "flex items-center gap-2 pl-2 ";

  return (
    <div className="md:flex  md:m-0 max-h-screen overflow-y-auto">
      <div
        className={`bg-gray-50 shrink-0 w-2/3 md:w-[30%] lg:w-[20%] pl-8 pr-5  h-screen  absolute  top-0 bottom-0 z-50 transition-all duration-500 lg:sticky lg:top-0 lg:left-0 lg:bottom-0  ${
          menuOpen ? "left-0" : "-left-80"
        }  `}
      >
        <div className=" mb-2  flex flex-col   h-full ">
          <div className="text-end text-xl lg:hidden font-bold ">
            <button className="pt-2" onClick={() => setMenuOpen(false)}>
              <HiOutlineXMark className="w-7 h-7" />
            </button>
          </div>
          <SideNavLinks />

          <ul className="   space-y-1 pb-6">
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
        <div className=" flex gap-2 items-center mt-2">
          <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
            <HiBars3BottomLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="mt-3 lg:px-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
