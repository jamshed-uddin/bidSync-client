import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import DashboardTitle from "../../components/dashboard/DashboardTitle";
import Button from "../../components/Button";
const CreateAuction = () => {
  const { id: editingProductId } = useParams();
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

  const navigate = useNavigate();
  console.log(auctionData);

  // using add product form for editing product by filling the product state with the product that need to be edited.
  useEffect(() => {
    if (editingProductId) {
      setEditMode(true);
    }

    const loadHeroProduct = async () => {
      const data = await axios.get(
        `http://localhost:3000/products/${editingProductId}`
      );

      setProductData(data?.data);
    };

    loadHeroProduct();
  }, [editingProductId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuctionData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoURLInputChange = (e, inputIndex) => {
    const value = e.target.value;
    // const name = e.target.name;
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

  const submitProduct = async (e) => {
    e.preventDefault();

    console.log(auctionData);

    // try {
    //   // if the form being used for editing product;
    //   if (editMode && editingProductId) {
    //     setLoading(true);
    //     const updatedProduct = await axios.patch(
    //       `http://localhost:3000/products/${editingProductId}`,
    //       product
    //     );
    //     navigate(
    //       `/sneaker/${updatedProduct?.data?.model}/${updatedProduct?.data?.id}`
    //     );

    //     setLoading(false);
    //     return;
    //   } else {
    //     // if the form is being used for adding product;
    //     setLoading(true);
    //     const addedProduct = await axios.post(
    //       "http://localhost:3000/products",
    //       product
    //     );
    //     navigate(
    //       `/sneaker/${addedProduct?.data?.model}/${addedProduct?.data?.id}`
    //     );

    //     setLoading(false);
    //   }
    // } catch (error) {
    //   setLoading(false);
    // }
  };

  return (
    <div className="pb-7">
      <DashboardTitle>
        {editingProductId && editMode ? "Edit auction" : "Add auction"}
      </DashboardTitle>
      <div className="mt-2 lg:w-3/4">
        <form onSubmit={submitProduct} className="md:space-y-4 mt-5">
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
                  value={auctionData.imageUrl}
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
              <label htmlFor="" className="block text-lg font-semibold ">
                Clossed in
              </label>
              <input
                type="date"
                placeholder="Closses in"
                className="input input-bordered w-full  focus:outline-none"
                name="clossesIn"
                value={auctionData.clossesIn}
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
                <option value="art">Art</option>
                <option value="jwellery">Jwellery</option>
                <option value="watches">Watches</option>
                <option value="others">Others</option>
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
            <Button disabled={loading} type={"submit"}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAuction;
