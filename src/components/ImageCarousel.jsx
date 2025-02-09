import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
const ImageCarousel = ({ images }) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <div className="h-full w-full overflow-hidden relative rounded-lg">
      {images?.map((photo, index) => (
        <img
          key={index}
          className={`h-full w-full object-cover transition-opacity absolute duration-500 ${
            photoIndex === index ? "opacity-100" : "opacity-0"
          }`}
          src={photo.url}
          alt={`Image of auction item`}
          loading="lazy"
        />
      ))}
      {images?.length > 1 && (
        <>
          <span
            onClick={() => setPhotoIndex((p) => p + 1)}
            className={`absolute top-1/2  bg-white py-1 rounded-xl right-1 -translate-y-1/2 cursor-pointer ${
              photoIndex + 1 === images?.length ? "hidden" : "absolute"
            }`}
          >
            <FaChevronRight size={25} />
          </span>
          <span
            onClick={() => setPhotoIndex((p) => p - 1)}
            className={` top-1/2  bg-white py-1 rounded-xl left-1 -translate-y-1/2 cursor-pointer ${
              photoIndex === 0 ? "hidden" : "absolute"
            }`}
          >
            <FaChevronLeft size={25} />
          </span>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
