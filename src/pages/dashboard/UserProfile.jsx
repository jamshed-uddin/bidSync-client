import { useState } from "react";

import DashboardTitle from "../../components/dashboard/DashboardTitle";
import Button from "../../components/Button";
import useSingleUser from "../../hooks/useSingleUser";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useGetData from "../../hooks/useGetData";
import ProfileSkeleton from "../../components/ProfileSkeleton";
import AddBankInfo from "../../components/dashboard/AddBankInfo";
import { FiEdit } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserProfile = () => {
  const { singleUser, singleUserLoading, singleUserRefetch } = useSingleUser();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState({
    name: "",
    photoURL: "",
    address: {
      country: "",
      city: "",
      state: "",
      zip: "",
      address: "",
    },
  });

  const [editProfile, setEditProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressLineInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  // editing profile info
  const submitEditProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axiosSecure.patch(`/user/${singleUser?._id}`, userInfo);
      setLoading(false);
      setEditProfile(false);
      toast.success("Profile updated");
      singleUserRefetch();
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  const inputStyle =
    "input input-bordered w-full  focus:outline-none bg-white mt-1";

  if (singleUserLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="mt-3 pb-2 w-full">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 3000 }}
      />
      {!editProfile ? (
        <>
          <div className="flex justify-end">
            <button onClick={() => setEditProfile(true)} className="btn btn-sm">
              <span>
                <FiEdit />
              </span>{" "}
              <span> Edit profile</span>
            </button>
          </div>

          <div className="  ">
            <div className="flex items-center gap-4 mb-6">
              {/* profile image */}
              <div className="avatar placeholder  ">
                <div className="bg-neutral text-neutral-content rounded-full w-24">
                  {singleUser?.photoURL || user?.photoURL ? (
                    <img
                      className="w-full object-cover"
                      src={singleUser?.photoURL || user?.photoURL}
                      alt="Profile photo"
                    />
                  ) : (
                    <span className="text-xl">
                      {singleUser?.name
                        ? singleUser?.name.at(0).toUpperCase()
                        : "Image"}
                    </span>
                  )}
                </div>
              </div>
              {/* name and email */}
              <div className="">
                <h1
                  className="
        lg:text-3xl text-2xl font-semibold"
                >
                  {singleUser?.name || "Users name"}
                </h1>
                <h4 className="font-light">
                  {singleUser?.email || "User email: Not available"}
                </h4>
              </div>
            </div>

            {/* other user detail */}
            <div className="w-full border-t-2 pt-3  space-y-4">
              {/* address */}
              <div>
                <h1 className="text-2xl mb-4 font-semibold">Address</h1>
                {Object.keys(singleUser?.address || {})?.map((key, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-center text-lg mb-1"
                  >
                    <h1 className="text-lg font-semibold w-1/2">
                      {key === "addressLineOne"
                        ? "Address line 1"
                        : key === "addressLineTwo"
                        ? "Address line 2"
                        : key.charAt(0).toUpperCase() + key.slice(1)}
                    </h1>
                    <h2>{singleUser?.address[key] || "Not available"}</h2>
                  </div>
                ))}
              </div>

              {/* back info */}
              <AddBankInfo />
            </div>
          </div>
        </>
      ) : (
        // edit profile form
        <div className=" pb-8">
          <div>
            <DashboardTitle>Edit profile</DashboardTitle>
          </div>

          <form onSubmit={submitEditProfile} className="space-y-2 mt-4">
            <div className="w-full">
              <label htmlFor="" className="block text-lg font-semibold ">
                name
              </label>
              <input
                type="text"
                placeholder="Name"
                className={inputStyle}
                name="name"
                value={userInfo.name || singleUser?.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="" className="block text-lg font-semibold ">
                Photo url
              </label>
              <input
                type="text"
                placeholder="Photo url"
                className={inputStyle}
                name="photoURL"
                value={userInfo.photoURL || singleUser?.photoURL}
                onChange={handleInputChange}
              />
            </div>
            <div className="md:flex items-center gap-4">
              <div className="w-full">
                <label htmlFor="" className="block text-lg font-semibold ">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Country"
                  className={inputStyle}
                  name="country"
                  value={
                    userInfo.address.country || singleUser?.address?.country
                  }
                  onChange={handleAddressLineInput}
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="" className="block text-lg font-semibold ">
                  State
                </label>
                <input
                  type="text"
                  placeholder="State"
                  className={inputStyle}
                  name="state"
                  value={userInfo.address.state || singleUser?.address?.state}
                  onChange={handleAddressLineInput}
                />
              </div>
            </div>
            <div className="md:flex items-center gap-4">
              <div className="w-full">
                <label htmlFor="" className="block text-lg font-semibold ">
                  City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  className={inputStyle}
                  name="city"
                  value={userInfo.address.city || singleUser?.address?.city}
                  onChange={handleAddressLineInput}
                />
              </div>
              <div className="w-full">
                <label htmlFor="" className="block text-lg font-semibold ">
                  Zip
                </label>
                <input
                  type="number"
                  min={0}
                  placeholder="zip"
                  className={inputStyle}
                  name="zip"
                  value={userInfo.address.zip || singleUser?.address?.zip}
                  onChange={handleAddressLineInput}
                  required
                />
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="" className="block text-lg font-semibold ">
                Address
              </label>
              <textarea
                type="text"
                placeholder="Address"
                className="input input-bordered w-full  focus:outline-none min-h-20 max-h-40 bg-white mt-1"
                name="address"
                value={userInfo.address.address || singleUser?.address?.address}
                onChange={handleAddressLineInput}
                required
              />
            </div>

            <div className="mt-2 text-center md:text-end space-x-3">
              <Button
                style={"bordered"}
                type={"button"}
                clickFunc={() => setEditProfile(false)}
              >
                Cancel
              </Button>
              <Button disabled={loading} type={"submit"}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
