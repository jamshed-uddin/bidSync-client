import logo from "../assets/BidSyncLogo.png";
const Logo = () => {
  return (
    <div className="h-8 w-32 select-none">
      <img
        className="h-full w-full object-cover"
        src={logo}
        alt=""
        draggable="false"
      />
    </div>
  );
};

export default Logo;
