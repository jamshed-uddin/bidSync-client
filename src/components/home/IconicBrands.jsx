import Title from "../Title";
const brandLogo = [
  "https://logowik.com/content/uploads/images/681_canon.jpg",
  "https://logowik.com/content/uploads/images/863_louis_vuitton.jpg",
  "https://logowik.com/content/uploads/images/nikon2627.logowik.com.webp",
  "https://logowik.com/content/uploads/images/275_rolex.jpg",
  "https://logowik.com/content/uploads/images/434_omega.jpg",
  "https://www.ford.co.nz/content/ford/nz/en_nz/home/about-ford/use-of-logo/jcr:content/par/image/image.imgs.full.high.jpg/1619512193586.jpg",
];
const IconicBrands = () => {
  return (
    <div>
      <Title>Iconic brands</Title>
      <div className="grid  lg:grid-cols-6 grid-cols-3 gap-4 items-center my-6">
        {brandLogo.map((logo, index) => (
          <div key={index}>
            <img src={logo} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconicBrands;
