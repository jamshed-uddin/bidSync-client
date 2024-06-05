import { Link } from "react-router-dom";
import Title from "../Title";
const categoryPhoto = [
  {
    category: "Paintings",
    photo:
      "https://galerieverdun.com/art-cv/oil-paintings/abstract-art/m-significance.jpg",
  },
  {
    category: "Jewellery",
    photo:
      "https://www.vintagetimes.com.au/pub/media/catalog/product/cache/3969506d9e52ae5cd0eb5ea01654e4c1/c/a/caer2_2_.jpg",
  },
  {
    category: "Watches",
    photo:
      "https://watchworkspdx.com/wp-content/uploads/2021/01/ho4yq8c5igfq1eibtiri-1024x1024.jpg",
  },
  {
    category: "car & Motorbike",
    photo:
      "https://americancollectors.com/wp-content/uploads/1919-Ford-Model-T-Sedan.jpg",
  },
];
const RecommendedCategory = () => {
  return (
    <div className="min-h-screen h-max">
      <Title>Recommended categories</Title>
      <div className="grid  md:grid-cols-2  gap-8 my-6">
        {categoryPhoto.map((item, index) => (
          <div className="relative" key={index}>
            <Link
              to={"/categories"}
              state={{ category: item?.category.toLowerCase() }}
            >
              <div className=" h-[50vh] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={item.photo}
                  alt="Category photo"
                  loading="lazy"
                />
              </div>
              <h1 className="absolute inset-0 text-stone-50 text-4xl font-bold">
                {item.category}
              </h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCategory;
