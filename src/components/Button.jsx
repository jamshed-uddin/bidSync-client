/* eslint-disable react/prop-types */

const Button = ({ children, disabled, clickFunc, type, style, isLoading }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={clickFunc}
      className={`relative rounded-lg ${
        style === "bordered"
          ? "bg-white text-black border-[1.5px] border-black"
          : "bg-[#0f0e0e] text-white border-[1.5px] border-black"
      } ${
        (isLoading || disabled) && "opacity-70 cursor-not-allowed"
      } px-4 py-1 text-lg active:scale-95`}
    >
      {children}

      {isLoading && (
        <span className="loading loading-spinner loading-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
      )}
    </button>
  );
};

export default Button;
