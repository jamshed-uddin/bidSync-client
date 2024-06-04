/* eslint-disable react/prop-types */

const Button = ({ children, disabled, clickFunc, type, style }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={clickFunc}
      className={`${
        style === "bordered"
          ? "bg-white text-black border-[1.5px] border-black"
          : "bg-[#0f0e0e] text-white border-[1.5px] border-black"
      } px-4 py-2 text-lg active:scale-95`}
    >
      {children}
    </button>
  );
};

export default Button;
