import React from "react";
import isProfileComplete from "../../utils/isProfileComplete";
import { IoTrophyOutline, IoCardOutline } from "react-icons/io5"; //myListings, won bids , payments
import { VscGraph } from "react-icons/vsc"; //overview
import { PiGavel } from "react-icons/pi"; //mybids
import { GoTasklist } from "react-icons/go"; //manage listings
import { LiaShippingFastSolid } from "react-icons/lia"; //shippig
import { FiUser } from "react-icons/fi"; //account
import { BsFileEarmarkPlus } from "react-icons/bs";
import useSingleUser from "../../hooks/useSingleUser";
import { Link, useLocation } from "react-router-dom";
const routes = [
  { name: "Overview", href: "/dashboard", icon: VscGraph },
  { name: "My Listings", href: "/dashboard/myListings", icon: GoTasklist },
  { name: "My Bids", href: "/dashboard/myBids", icon: PiGavel },
  {
    name: "Won Auctions",
    href: "/dashboard/wonAuctions",
    icon: IoTrophyOutline,
  },
  {
    name: "List item",
    href: "/dashboard/listItem",
    icon: BsFileEarmarkPlus,
  },

  { name: "Shipping", href: "/dashboard/shipping", icon: LiaShippingFastSolid },
  { name: "Profile", href: "/dashboard/profile", icon: FiUser },
];

const SideNavLinks = () => {
  const { singleUser } = useSingleUser();
  const { pathname } = useLocation();

  const activeRouteStyle = (route) => {
    if (pathname.toLowerCase() === route.toLowerCase()) {
      return " bg-white rounded-lg text-blue-700";
    }
  };

  const linkStyle = "flex items-center gap-2 pl-2 py-1  rounded-lg";

  return (
    <ul className="  pt-3 md:pt-10 flex-grow space-y-1 ">
      {routes.map((link) => {
        const LinkIcon = link.icon;
        return (
          <li key={link.name} className="relative">
            {!!singleUser &&
              !isProfileComplete(singleUser) &&
              link.name === "Profile" && (
                <span className="w-2 h-2 rounded-full bg-red-500 block absolute left-0 top-0"></span>
              )}
            <Link
              to={link.href}
              className={`${activeRouteStyle(link.href)} ${linkStyle}`}
            >
              <LinkIcon /> {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SideNavLinks;
