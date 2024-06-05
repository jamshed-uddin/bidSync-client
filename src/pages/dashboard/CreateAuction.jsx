import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import DashboardTitle from "../../components/dashboard/DashboardTitle";
import Button from "../../components/Button";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const categories = [
  "Paintings",
  "Jewellery",
  "Fashion",
  "Watches",
  "Coin & stamps",
  "Car & motorbikes",
  "Toy & model",
  "Interior",
];

const CreateAuction = () => {
  const { id: editingAuctionId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [auctionData, setAuctionData] = useState({
    title: "",
    photoURL: [""],
    description: "",
    startingPrice: "",
    clossesIn: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // using add product form for editing product by filling the product state with the product that need to be edited.
  useEffect(() => {
    if (editingAuctionId) {
      setEditMode(true);
    }

    const loadHeroProduct = async () => {
      const data = await axios.get(
        `${import.meta.env.VITE_baseUrl}/listings/${editingAuctionId}`
      );

      setAuctionData(data?.data?.data);
    };

    loadHeroProduct();
  }, [editingAuctionId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "clossesIn") {
      setError("");
      const currentDate = new Date();
      const targetDate = new Date(value);
      const difference = targetDate - currentDate;
      if (difference <= 0) {
        return setError("Please choose a date from upcoming days");
      }
    }

    setAuctionData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoURLInputChange = (e, inputIndex) => {
    const value = e.target.value;
    setAuctionData((prev) => ({
      ...prev,
      photoURL: auctionData.photoURL.map((item, index) =>
        index === inputIndex ? value : item
      ),
    }));
  };

  const handleAddPhotoURLInput = () => {
    setAuctionData((prev) => ({
      ...prev,
      photoURL: [...auctionData.photoURL, ""],
    }));
  };

  const handleRemovePhotoURLInput = (inputIndex) => {
    if (auctionData.photoURL.length === 1) return;

    const filteredInput = auctionData.photoURL.filter(
      (item, index) => index !== inputIndex
    );

    setAuctionData((prev) => ({
      ...prev,
      photoURL: filteredInput,
    }));
  };

  console.log(auctionData);
  const submitAuction = async (e) => {
    e.preventDefault();

    try {
      // if the form being used for editing product;
      if (editMode && editingAuctionId) {
        setLoading(true);

        const updatedAuction = await axiosSecure.patch(
          `/listings/${editingAuctionId}`,
          auctionData
        );

        toast.success("Auction updated successfully");
        navigate(`/auctions/${updatedAuction?.data?.data.auctionId}`, {
          replace: true,
        });

        setLoading(false);
        return;
      } else {
        // if the form is being used for adding product;
        setLoading(true);
        const addedAuction = await axiosSecure.post("/listings", auctionData);
        navigate(`/auctions/${addedAuction?.data?.data.auctionId}`, {
          replace: true,
        });

        toast.success("Auction created successfully");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="pb-7">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />
      <DashboardTitle>
        {editingAuctionId && editMode ? "Edit auction" : "Add auction"}
      </DashboardTitle>
      <div className="mt-2 lg:w-3/4">
        <form onSubmit={submitAuction} className="md:space-y-4 mt-5">
          <div className="md:flex  gap-4 ">
            <div className="w-full">
              <label htmlFor="" className="block text-lg font-semibold ">
                title
              </label>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full  focus:outline-none"
                name="title"
                value={auctionData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="" className="block text-lg font-semibold ">
                Starting price
              </label>
              <input
                type="number"
                placeholder="Starting price"
                className="input input-bordered w-full  focus:outline-none"
                name="startingPrice"
                value={
                  auctionData.startingPrice &&
                  parseInt(Number(auctionData.startingPrice))
                }
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* photo url input */}
          <div>
            <label htmlFor="" className="block text-lg font-semibold ">
              Photo url
            </label>
            {auctionData.photoURL.map((item, index) => (
              <div key={index} className="w-full mb-2 relative">
                <input
                  type="text"
                  placeholder="Photo url"
                  className="input input-bordered w-full  focus:outline-none"
                  name="photoURL"
                  value={item}
                  onChange={(e) => handlePhotoURLInputChange(e, index)}
                  required
                />
                <span
                  onClick={() => handleRemovePhotoURLInput(index)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer px-3"
                >
                  X
                </span>
              </div>
            ))}

            <div onClick={handleAddPhotoURLInput} className="mt-2 w-fit">
              <Button type={"button"}>Add more</Button>
            </div>
          </div>
          <div className="md:flex  gap-4 ">
            <div className="w-full">
              <label
                htmlFor=""
                className=" text-lg font-semibold flex justify-between items-center"
              >
                <span>Clossed in</span>{" "}
                <span className="text-red-600 text-sm ">{error}</span>
              </label>
              <input
                type="date"
                placeholder="Closses in"
                className="input input-bordered w-full  focus:outline-none"
                name="clossesIn"
                value={auctionData?.clossesIn?.split("T").at(0)}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="w-full">
              <label htmlFor="" className="block text-lg font-semibold ">
                Category
              </label>

              <select
                className="select select-bordered focus:outline-none w-full"
                name="category"
                id=""
                onChange={handleInputChange}
                value={auctionData.category}
                required
              >
                <option value="">Choose category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="" className="block text-lg font-semibold ">
              Description
            </label>
            <textarea
              type="text"
              placeholder="Product description"
              className="input input-bordered w-full  focus:outline-none min-h-20 max-h-40"
              name="description"
              value={auctionData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-2 text-center md:text-end ">
            <Button disabled={loading} isLoading={loading} type={"submit"}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAuction;
