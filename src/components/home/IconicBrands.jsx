import Title from "../Title";

const IconicBrands = () => {
  return (
    <div>
      <Title>Iconic brands</Title>
      <div className="grid  lg:grid-cols-6 grid-cols-2 gap-4 my-6">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div className="bg-gray-100 p-12" key={index}>
            {" "}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconicBrands;
