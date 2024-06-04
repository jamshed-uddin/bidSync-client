/* eslint-disable react/prop-types */

import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [] }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {products?.map((sneaker) => (
        <ProductCard key={sneaker.id} product={sneaker} />
      ))}
    </div>
  );
};

export default ProductGrid;
