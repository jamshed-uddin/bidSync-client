import { MdOutlineShare } from "react-icons/md";

import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";

const handleMoreShare = async () => {
  if (navigator.canShare) {
    navigator.share({
      url: window.location.href,
    });
  }
};

const ShareButtons = () => {
  return (
    <>
      <h2 className="text-xl mb-1 font-semibold">Share this object</h2>

      <div className="flex items-center gap-5 mt-3">
        <div>
          <FacebookShareButton url={window?.location?.href}>
            <FacebookIcon size={30} borderRadius={10} />
          </FacebookShareButton>
        </div>
        <div>
          <TwitterShareButton url={window?.location?.href}>
            <XIcon size={30} borderRadius={10} />
          </TwitterShareButton>
        </div>
        <div>
          <PinterestShareButton url={window?.location?.href}>
            <PinterestIcon size={30} borderRadius={10} />
          </PinterestShareButton>
        </div>
        <div>
          <button onClick={handleMoreShare}>
            <MdOutlineShare size={25} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ShareButtons;
