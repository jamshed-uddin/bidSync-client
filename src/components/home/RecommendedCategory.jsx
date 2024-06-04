import Title from "../Title";

const RecommendedCategory = () => {
  return (
    <div>
      <Title>Recommended categories</Title>
      <div className="grid  grid-cols-2 gap-4 my-6">
        {[1, 2, 3, 4].map((item, index) => (
          <div className="bg-gray-100 p-12" key={index}>
            {" "}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCategory;
