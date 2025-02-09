// import { deleteImage, uploadImage } from "@/lib/imageUploadAndDelete";

import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { IoImageOutline } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { deleteImage, uploadImage } from "../../utils/imageUploadAndDelete";

const ImageDropZone = ({ photoUrl, setItemData }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (files, rejectedFiles) => {
    setError("");

    if (rejectedFiles.length > 0) {
      return setError("Unsupported file");
    }

    const photoUrls = [];

    if (files.length > 0) {
      files.forEach((file) => {
        const url = URL.createObjectURL(file);
        photoUrls.push({ url, publicId: "" });
      });

      setItemData((prev) => ({
        ...prev,
        photoURL: [...prev.photoURL, ...photoUrls],
      }));

      try {
        setUploading(true);
        const { data } = await uploadImage(files);

        setItemData((prev) => {
          const updatedPhotoURLs = prev.photoURL.map((photo, index) => {
            if (index >= prev.photoURL.length - files.length) {
              // Replace the preview with the response object
              return {
                ...photo,
                ...data.urls[index - (prev.photoURL.length - files.length)],
              };
            }
            return photo;
          });

          return {
            ...prev,
            photoURL: updatedPhotoURLs, // Updated photoURL array with actual data
          };
        });
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setUploading(false);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFile,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    disabled: uploading,
    maxFiles: 15,
  });

  const removePhoto = async (urlObject) => {
    setItemData((prev) => ({
      ...prev,
      photoURL: prev.photoURL.filter((urlObj) => urlObj.url !== urlObject.url),
    }));

    if (urlObject.publicId) {
      try {
        await deleteImage([urlObject.publicId]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border border-black rounded-xl h-60 lg:h-64 w-full flex justify-center items-center `}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="flex flex-col items-center px-3 lg:px-0">
            <HiOutlineInboxArrowDown className="w-5" />
            <span>Drop the files here</span>
          </p>
        ) : (
          <p className="flex flex-col items-center  px-3 lg:px-0">
            <IoImageOutline className="w-5" />
            <span>Drag n drop some files here</span>
            <span>
              {" "}
              or{" "}
              <span className="cursor-pointer text-blue-600 inline">
                click
              </span>{" "}
              to select files
            </span>
            <span className="text-xs font-light">
              Only *.jpg, *.jpeg and *.png images will be accepted.
            </span>
          </p>
        )}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
      {photoUrl?.length > 0 && (
        <div className="grid grid-cols-2 md-grid-cols-3 lg:grid-cols-5 gap-3 py-2">
          {photoUrl?.length > 0 &&
            photoUrl.map((urlObj, idx) => (
              <div key={idx} className="relative ">
                <img
                  src={urlObj.url}
                  alt=""
                  height={100}
                  width={100}
                  className="h-40  rounded-xl shadow-md object-cover w-full"
                  onLoad={() => URL.revokeObjectURL(urlObj.url)}
                />
                <span
                  role="button"
                  onClick={() => removePhoto(urlObj)}
                  className="absolute -top-1 -right-1 bg-red-600 text-white hover:text-red-600 hover:bg-white rounded-full p-1 transition-all duration-300 cursor-pointer shadow-lg"
                >
                  <HiXMark className="w-4 " />
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ImageDropZone;
