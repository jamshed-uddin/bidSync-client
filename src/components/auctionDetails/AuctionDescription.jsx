import React from "react";

const AuctionDescription = ({ auction }) => {
  return (
    <div>
      <h2 className="mt-4 font-semibold text-xl">Description</h2>
      <p className="text-lg">{auction?.description}</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum accusamus
        inventore suscipit molestias, incidunt ratione ea eligendi quam
        asperiores veritatis totam eum nobis voluptatum, corrupti mollitia
        deleniti labore officiis pariatur? Iusto velit, expedita reprehenderit
        omnis cumque assumenda laboriosam quidem voluptate nesciunt optio totam
        quaerat laborum. Quaerat exercitationem repudiandae dignissimos.
        Architecto alias repudiandae ab dolor provident dolorem cupiditate iusto
        reprehenderit quam. Expedita, voluptas quibusdam. Corrupti eligendi
        cupiditate quis! Itaque, eveniet reprehenderit? Consequuntur ipsa amet
        vel. Explicabo deleniti quas ratione repellat id neque exercitationem,
        quia similique, vero ullam laborum officiis magni iure.
      </p>
    </div>
  );
};

export default AuctionDescription;
