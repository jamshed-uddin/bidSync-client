import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineBookmark } from "react-icons/hi2";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="navbar  bg-white text-[#0c0c0c]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 bg-white"
          >
            <li>
              <Link to={"/auctions"}>Auctions</Link>
            </li>
            <li>
              <Link to={"/categories"}>Categories</Link>
            </li>
            <li>
              <Link to={"/sell"}>Sell</Link>
            </li>
          </ul>
        </div>
        <Link to={"/"}>
          <h1 className="text-lg lg:text-2xl font-bold">BidSync</h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-8 px-1 text-lg">
          <li>
            <Link to={"/auctions"}>Auctions</Link>
          </li>
          <li>
            <Link to={"/categories"}>Categories</Link>
          </li>
          <li>
            <Link to={"/sell"}>Sell</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className=" flex items-center gap-3">
          <ul className=" flex items-center gap-3">
            <li>
              <Link to={"/search"}>
                <span>
                  <HiMagnifyingGlass size={25} />
                </span>
              </Link>
            </li>
            <li>
              <Link to={"/savedItems"}>
                {" "}
                <span>
                  <HiOutlineBookmark size={25} />
                </span>
              </Link>
            </li>
          </ul>
          {user ? (
            <Link to={"/dashboard/profile"}>
              <div className="  flex gap-2 md:bg-gray-100 p-1 rounded-lg">
                <div className="hidden md:block">Dashboard</div>
                <div className="avatar">
                  <div className="bg-neutral text-neutral-content rounded-full w-6">
                    {user?.photoURL ? (
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
              {" "}
              <div className="btn btn-sm">Login</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
