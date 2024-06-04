import Title from "../components/Title";

const SavedItems = () => {
  return (
    <div>
      <div>
        <Title>Saved items</Title>
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

export default SavedItems;
