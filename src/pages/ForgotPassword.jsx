import { useState } from "react";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import { MdOutlineMarkEmailRead } from "react-icons/md";

const ForgotPassword = () => {
  const { resetPasswordEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleForgotPassRequest = async () => {
    if (!email) {
      return setError("Valid email required");
    }
    setLoading(true);
    try {
      await resetPasswordEmail(email);
      setEmailSent(true);
      setLoading(false);
    } catch (error) {
      setError("Something went wrong!");
      setLoading(false);
    }
    setLoading(false);
  };

  const inputStyle = "input input-bordered w-full  focus:outline-none bg-white";
  return (
    <>
      {emailSent ? (
        <div className="h-screen w-full flex justify-center items-center">
          <div className="lg:w-1/4 mx-auto">
            <MdOutlineMarkEmailRead size={25} className="mx-auto opacity-70" />
            <h2 className="text-lg">
              Check inbox for an email sent to you with further instruction for
              reseting the password.
            </h2>
          </div>
        </div>
      ) : (
        <div
          className={` flex justify-center items-center  h-screen  
       bg-white text-gray-800 `}
        >
          <div className="w-[85%] lg:w-2/5 mx-auto ">
            <h1 className="text-2xl font-semibold text-center mb-6">
              Having problem signing in?
            </h1>
            <div>
              <div className="w-full">
                <label htmlFor="" className="text-lg font-semibold block mb-2">
                  Enter a valid email
                </label>
                <input
                  type="text"
                  placeholder="Enter you email"
                  className={inputStyle}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && (
                <span className="text-red-500 text-sm ml-1">{error}</span>
              )}
              <div className="form-control mt-3">
                <Button disabled={loading} clickFunc={handleForgotPassRequest}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
