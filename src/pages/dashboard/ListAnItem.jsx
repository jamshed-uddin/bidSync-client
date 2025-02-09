import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import DashboardTitle from "../../components/dashboard/DashboardTitle";
import Button from "../../components/Button";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import CompletionText from "../../components/dashboard/CompletionText";
import { HiXMark } from "react-icons/hi2";

import useSingleUser from "../../hooks/useSingleUser";
import isProfileComplete from "../../utils/isProfileComplete";
import ImageDropZone from "../../components/dashboard/ImageDropZone";

const categories = [
  "Paintings",
  "Jewellery",
  "Fashion",
  "Watches",
  "Coin & Stamps",
  "Car & Motorbikes",
  "Toy & Model",
  "Interior",
];

const ListAnItem = () => {
  const { id: editingItemId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const { singleUser } = useSingleUser();
  const [itemData, setItemData] = useState({
    title: "",
    photoURL: [],
    format: "auction",
    priceForBuyItNow: "",
    description: "",
    startingPrice: "",
    clossesIn: "",
    category: "",
    details: [{ title: "", value: "" }],
  });
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // using add product form for editing product by filling the product state with the product that need to be edited.
  useEffect(() => {
    if (!editingItemId) return;
    if (editingItemId) {
      setEditMode(true);
    }

    const loadHeroProduct = async () => {
      const data = await axios.get(
        `${import.meta.env.VITE_baseUrl}/listings/${editingItemId}`
      );

      setItemData(data?.data?.data);
    };

    loadHeroProduct();
  }, [editingItemId]);

  useEffect(() => {
    if (!formChanged) return;
    const handleUnload = (event) => {
      event?.preventDefault();
      event.returnValue = "Changes you made may not be saved.";
      return "";
    };

    window.addEventListener("beforeunload", handleUnload, { capture: true });

    return () => {
      window.removeEventListener("beforeunload", handleUnload, {
        capture: true,
      });
    };
  }, [formChanged]);

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

    setItemData((prev) => ({ ...prev, [name]: value }));
  };

  //   const value = e.target.value;
  //   setItemData((prev) => ({
  //     ...prev,
  //     photoURL: itemData.photoURL.map((item, index) =>
  //       index === inputIndex ? value : item
  //     ),
  //   }));
  // };

  // const handleAddPhotoURLInput = () => {
  //   setAuctionData((prev) => ({
  //     ...prev,
  //     photoURL: [...auctionData.photoURL, ""],
  //   }));
  // };

  // const handleRemovePhotoURLInput = (inputIndex) => {
  //   if (auctionData.photoURL.length === 1) return;

  //   const filteredInput = auctionData.photoURL.filter(
  //     (item, index) => index !== inputIndex
  //   );

  //   setAuctionData((prev) => ({
  //     ...prev,
  //     photoURL: filteredInput,
  //   }));
  // };

  const handleDetailChange = (e, detailIndex) => {
    const { name, value } = e.target;

    setItemData((prev) => ({
      ...prev,
      details: prev?.details?.map((singleDetail, index) =>
        detailIndex === index
          ? name === "title"
            ? { ...singleDetail, title: value }
            : { ...singleDetail, value: value }
          : singleDetail
      ),
    }));
  };

  const addMoreDetailHandler = () => {
    setItemData((prev) => ({
      ...prev,
      details: [...prev.details, { title: "", value: "" }],
    }));
  };
  console.log(itemData);
  const removeDetailField = (detailIndex) => {
    setItemData((prev) => ({
      ...prev,
      details: prev.details.filter((_, index) => index !== detailIndex),
    }));
  };

  const submitItem = async (e) => {
    e.preventDefault();

    try {
      // if the form being used for editing product;
      if (editMode && editingItemId) {
        setLoading(true);

        const updatedItem = await axiosSecure.patch(
          `/listings/${editingItemId}`,
          itemData
        );

        toast.success("Item updated successfully");
        navigate(`/listings/${updatedItem?.data?.data.itemId}`, {
          replace: true,
        });

        setLoading(false);
        return;
      } else {
        // if the form is being used for adding product;
        setLoading(true);
        const addedItem = await axiosSecure.post("/listings", itemData);
        navigate(`/listings/${addedItem?.data?.data.itemId}`, {
          replace: true,
        });

        toast.success("Item created successfully");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  const inputStyle =
    "input input-bordered w-full  focus:outline focus:outline-1 focus:outline-black bg-white  text-base";
  const labelStyle = "block mb-1 font-medium";

  return (
    <div className="pb-7">
      <CompletionText />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />
      <DashboardTitle>
        {editingItemId && editMode ? "Edit auction" : "Add auction"}
      </DashboardTitle>
      <div className="mt-2 ">
        <form
          onSubmit={submitItem}
          onChange={() => setFormChanged(true)}
          className="md:space-y-4 mt-5"
        >
          <div className="space-y-4">
            {/* Items metadata */}
            <div className="border border-gray-300 p-4 rounded-xl">
              <DashboardTitle
                className={"!font-normal  !text-base  uppercase mb-4"}
              >
                Item
              </DashboardTitle>
              <div className="md:flex  gap-4  space-y-4 lg:space-y-0 mb-4">
                {/* title */}
                <div className="w-full">
                  <label htmlFor="" className={labelStyle}>
                    title
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    className={inputStyle}
                    name="title"
                    value={itemData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* list category */}
                <div className="w-full">
                  <label htmlFor="" className={labelStyle}>
                    Category
                  </label>

                  <select
                    className="select select-bordered focus:outline-none w-full bg-white"
                    name="category"
                    id=""
                    onChange={handleInputChange}
                    value={itemData.category}
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
              {/* description */}
              <div>
                <label htmlFor="" className={labelStyle}>
                  Description
                </label>
                <textarea
                  type="text"
                  placeholder="Product description"
                  className="input input-bordered w-full  focus:outline-none min-h-20 max-h-40  bg-white"
                  name="description"
                  value={itemData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* images */}

            <div className="border border-gray-300 p-4 rounded-xl">
              <DashboardTitle
                className={"!font-normal  !text-base  uppercase mb-4"}
              >
                Images
              </DashboardTitle>
              <ImageDropZone
                photoUrl={itemData.photoURL}
                setItemData={setItemData}
              />
            </div>

            {/* format and pricings */}
            <div className="border border-gray-300 p-4 rounded-xl">
              <DashboardTitle
                className={"!font-normal  !text-base  uppercase mb-4"}
              >
                Pricing
              </DashboardTitle>

              <div>
                {/* list category */}
                <div className="w-full lg:w-1/2 mb-4">
                  <label htmlFor="" className={labelStyle}>
                    Format
                  </label>

                  <select
                    className="select select-bordered focus:outline-none w-full bg-white"
                    name="format"
                    id=""
                    onChange={handleInputChange}
                    value={itemData.format}
                    required
                  >
                    <option value={"auction"}>Auction</option>
                    <option value={"buyItNow"}>Buy it now</option>
                  </select>
                </div>
              </div>
              {itemData?.format === "buyItNow" ? (
                <div className="w-full lg:w-1/2">
                  <label htmlFor="" className={labelStyle}>
                    Price
                  </label>
                  <input
                    type="number"
                    placeholder="Starting price"
                    className={inputStyle}
                    name="priceForBuyItNow"
                    value={
                      itemData.priceForBuyItNow &&
                      parseInt(Number(itemData.priceForBuyItNow))
                    }
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ) : (
                <div className="md:flex  gap-4 space-y-4 lg:space-y-0">
                  {/*auction price  */}
                  <div className="w-full">
                    <label htmlFor="" className={labelStyle}>
                      Starting price
                    </label>
                    <input
                      type="number"
                      placeholder="Starting price"
                      className={inputStyle}
                      name="startingPrice"
                      value={
                        itemData.startingPrice &&
                        parseInt(Number(itemData.startingPrice))
                      }
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* auction duration */}
                  <div className="w-full">
                    <label htmlFor="" className={labelStyle}>
                      <span>Closses in</span>{" "}
                      <span className="text-red-600 text-sm ">{error}</span>
                    </label>
                    <input
                      type="date"
                      placeholder="Closses in"
                      className={inputStyle}
                      name="clossesIn"
                      value={itemData?.clossesIn?.split("T").at(0)}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* project details */}
            <div className="p-3 border-[1.3px] border-gray-300 rounded-lg">
              <h2 className="text-lg uppercase mb-2">Product details</h2>

              <div>
                {itemData?.details?.map((singleDetail, index, allDetails) => (
                  <div key={index} className="mb-5 flex items-center gap-2">
                    <div className=" lg:flex items-center  gap-3 space-y-1 lg:space-y-0 flex-grow">
                      <input
                        className={`${inputStyle} w-full`}
                        type="text"
                        name="title"
                        value={singleDetail?.title}
                        onChange={(e) => handleDetailChange(e, index)}
                        placeholder={
                          index === 0 ? "Title (e.g. Material)" : "Title"
                        }
                      />

                      <input
                        className={`w-full ${inputStyle}`}
                        type="text"
                        name="value"
                        value={singleDetail?.value}
                        onChange={(e) => handleDetailChange(e, index)}
                        placeholder={
                          index === 0 ? "Value (e.g. Plywood)" : "Value"
                        }
                      />
                    </div>

                    <button
                      type="button"
                      disabled={allDetails?.length === 1}
                      onClick={() => removeDetailField(index)}
                      className={`curson-pointer  ${
                        allDetails?.length === 1 ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <HiXMark className="w-6" />
                    </button>
                  </div>
                ))}
                <Button
                  type="button"
                  className="border-[1.3px] border-black rounded-lg py-1.5 px-2"
                  clickFunc={addMoreDetailHandler}
                >
                  Add more
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-2 text-center md:text-end ">
            <Button
              disabled={loading || !isProfileComplete(singleUser)}
              isLoading={loading}
              type={"submit"}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListAnItem;
