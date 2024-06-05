import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="mt-8 mx-2  w-full">
      <div className="w-full mb-4">
        {/* footer's top divider */}
        <div className="border-t-2 w-3/4 lg:w-1/2 mx-auto"></div>
      </div>

      <div className="md:flex justify-between  space-y-8 md:space-y-0">
        <div>
          <h1 className="text-lg lg:text-2xl font-bold text-center md:text-start">
            BidSync
          </h1>
          <div className="flex justify-evenly mt-1">
            <span>
              <FaFacebookF />
            </span>
            <span>
              <FaInstagram />
            </span>
            <span>
              <FaXTwitter />
            </span>
          </div>
        </div>

        <div>
          <ul>
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
        <div>
          <ul>
            <li>
              <Link to={"/login"}>Sign in</Link>
            </li>
            <li>
              <Link to={"/signup"}>Register</Link>
            </li>

            <li>Terms & conditon</li>
            <li>Privacy & policy</li>
          </ul>
        </div>
      </div>
      <div className="mt-2">
        <h1 className="text-center font-thin text-sm">
          @2024 BidSync.All rights reserved.
        </h1>
      </div>
    </div>
  );
};

export default Footer;
