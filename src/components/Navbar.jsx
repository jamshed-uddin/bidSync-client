import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineBookmark } from "react-icons/hi2";
import Logo from "./Logo";
import Notifications from "./Notifications";
import { FiUser } from "react-icons/fi"; //account

const Navbar = () => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  return (
    <div className="navbar  bg-white text-[#0c0c0c] min-h-fit py-2">
      <div className="navbar-start ">
        <div className="dropdown ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden p-0 h-fit min-h-fit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-md  rounded-box w-52 bg-white"
          >
            <li>
              <Link to={"/auctions"}>Auctions</Link>
            </li>

            <li>
              <Link to={"/sell"}>Sell</Link>
            </li>
          </ul>
        </div>
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-8 px-1  text-lg">
          <li>
            <Link to={"/auctions"}>Auctions</Link>
          </li>

          <li>
            <Link to={"/sell"}>Sell</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className=" flex items-center gap-3">
          <ul className=" flex items-center gap-3">
            {pathname !== "/auctions" && (
              <li>
                <Link to={"/auctions"} state={{ focusSearchBar: true }}>
                  <span>
                    <HiMagnifyingGlass size={25} />
                  </span>
                </Link>
              </li>
            )}
            {user?.email && !loading && (
              <>
                <li>
                  <Link to={"/savedItems"}>
                    <span>
                      <HiOutlineBookmark size={25} />
                    </span>
                  </Link>
                </li>

                <li>
                  <Notifications />
                </li>
              </>
            )}
          </ul>
          {user ? (
            <Link to={"/dashboard"}>
              <div className="   p-1 rounded-lg">
                <div className="avatar">
                  <div className="bg-neutral text-neutral-content rounded-full w-6">
                    {user ? (
                      <img
                        className="w-full object-cover"
                        src={user?.photoURL}
                        alt="Profile photo"
                      />
                    ) : (
                      <span className="text-xl">
                        {user?.displayName
                          ? user?.displayName.at(0).toUpperCase()
                          : ""}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <Link to={"/login"}>
              <FiUser size={25} style={{ opacity: "70%" }} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
