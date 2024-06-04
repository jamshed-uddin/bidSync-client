import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import Button from "../../components/Button";

const UserProfile = () => {
  const { user } = useAuth();
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

  console.log(userInfo);

  const submitEditProfile = (e) => {
    e.preventDefault();

    console.log(userInfo);
  };

  return (
    <div className="mt-3 pb-2 w-full">
      {!editProfile ? (
        <>
          <div className="flex justify-end">
            <button onClick={() => setEditProfile(true)} className="btn btn-sm">
              Edit profile
            </button>
          </div>
          <div className=" flex flex-col items-center ">
            <div className="avatar placeholder  ">
              <div className="bg-neutral text-neutral-content rounded-full w-24">
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
                      : "Image"}
                  </span>
                )}
              </div>
            </div>
            <div className="text-center">
              <h1
                className="
        text-xl font-semibold"
              >
                {user?.displayName || "Users name"}
              </h1>
              <h4 className="font-light">
                {user?.email || "User email: Not available"}
              </h4>
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
                value={userInfo.name}
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
                value={userInfo.photoURL}
                onChange={handleInputChange}
                required
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
                  value={userInfo.address.country}
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
                  value={userInfo.address.city}
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
                value={userInfo.address.addressLineOne}
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
                value={userInfo.address.addressLineTwo}
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
