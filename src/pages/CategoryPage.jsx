import Title from "../components/Title";

const CategoryPage = () => {
  return (
    <div>
      <Title>Categories</Title>
      <div>
        <div>categories here</div>
        <div className="grid  lg:grid-cols-3 gap-4 my-6">
          {[1, 2, 3, 4].map((item, index) => (
            <div className="bg-gray-100 p-12" key={index}>
              {" "}
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
