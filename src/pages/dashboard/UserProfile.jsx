import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import Button from "../../components/Button";
import useSingleUser from "../../hooks/useSingleUser";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useGetData from "../../hooks/useGetData";
import ProfileSkeleton from "../../components/ProfileSkeleton";

const UserProfile = () => {
  const { singleUser, singleUserLoading, singleUserRefetch } = useSingleUser();
  const { data: myBids } = useGetData(`/bids/mybids/${singleUser?._id}`);

  const { data: myListings } = useGetData(
    `/listings/myListings/${singleUser?._id}`
  );

  const [userInfo, setUserInfo] = useState({
    name: "",
    photoURL: "",
    address: {
      country: "",
      city: "",
      addressLineOne: "",
      addressLineTwo: "",
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
      await axios.patch(
        `${import.meta.env.VITE_baseUrl}/user/${singleUser?._id}`,
        userInfo
      );
      setLoading(false);
      setEditProfile(false);
      toast.success("Profile updated");
      singleUserRefetch();
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

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
              Edit profile
            </button>
          </div>

          <div className=" flex flex-col items-center ">
            {/* profile image */}
            <div className="avatar placeholder  ">
              <div className="bg-neutral text-neutral-content rounded-full w-24">
                {singleUser?.photoURL ? (
                  <img
                    className="w-full object-cover"
                    src={singleUser?.photoURL}
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
            <div className="text-center">
              <h1
                className="
        text-xl font-semibold"
              >
                {singleUser?.name || "Users name"}
              </h1>
              <h4 className="font-light">
                {singleUser?.email || "User email: Not available"}
              </h4>
            </div>
            {/* number of bid and auction */}
            <div className="md:flex gap-4 w-full md:w-1/2 text-center my-4  justify-center">
              <div className="px-9 py-3 rounded-xl shadow-md text-xl shrink-0 ">
                <h1>Bid placed</h1>
                <h3>{myBids?.length || "0"}</h3>
              </div>
              <div className="px-9 py-3 rounded-xl shadow-md text-xl shrink-0">
                <h1>My auction</h1>
                <h3>{myListings?.length || "0"}</h3>
              </div>
            </div>
            {/* other user detail */}
            <div className="w-full flex flex-col items-center border-t-2 pt-4 mt-2">
              {Object.keys(singleUser?.address || {})?.map((key, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <h1 className="text-lg font-semibold">
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
          </div>
        </>
      ) : (
        // edit profile form
        <div className="lg:px-7 pb-8">
          <div>
            <DashboardTitle>Edit profile</DashboardTitle>
          </div>

          <form onSubmit={submitEditProfile} className="space-y-2">
            <div className="w-full">
              <label htmlFor="" className="block text-lg font-semibold ">
                name
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full  focus:outline-none"
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
                className="input input-bordered w-full  focus:outline-none"
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
                  className="input input-bordered w-full  focus:outline-none"
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
                  City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  className="input input-bordered w-full  focus:outline-none"
                  name="city"
                  value={userInfo.address.city || singleUser?.address?.city}
                  onChange={handleAddressLineInput}
                  required
                />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="" className="block text-lg font-semibold ">
                Address line 1
              </label>
              <textarea
                type="text"
                placeholder="Address line 1"
                className="input input-bordered w-full  focus:outline-none min-h-20 max-h-40"
                name="addressLineOne"
                value={
                  userInfo.address.addressLineOne ||
                  singleUser?.address?.addressLineOne
                }
                onChange={handleAddressLineInput}
              />
            </div>
            <div className="w-full">
              <label htmlFor="" className="block text-lg font-semibold ">
                Address line 2
                <span className="font-light text-sm">(optional)</span>
              </label>
              <textarea
                type="text"
                placeholder="Address line 2"
                className="input input-bordered w-full  focus:outline-none min-h-20 max-h-40"
                name="addressLineTwo"
                value={
                  userInfo.address.addressLineTwo ||
                  singleUser?.address?.addressLineTwo
                }
                onChange={handleAddressLineInput}
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
