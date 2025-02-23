import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import Button from "../components/Button";

const Signup = () => {
  const { user, userSignup, loading, setLoading } = useAuth();
  const [userCredential, setUserCredential] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState({
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, user]);

  const handleInputChange = (e) => {
    setError("");
    setUserCredential((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserSignup = async () => {
    try {
      const { email, password, confirmPassword } = userCredential;
      if (!email | !password | !confirmPassword) {
        return setError("Fill up the required field");
      } else if (password !== confirmPassword) {
        return setError("Password does not match");
      } else if (password.length < 6) {
        return setError("Password must be 6 character at least.");
      }

      await userSignup(email, password);
      const userBody = {
        name: userCredential.name,
        email: userCredential.email,
      };
      await axios.post(`${import.meta.env.VITE_baseUrl}/user`, userBody);
    } catch (error) {
      setLoading((p) => !p);
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("An account with this email already exists.");
      }
    }
  };
  const inputStyle = "input input-bordered w-full  focus:outline-none bg-white";

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className=" lg:w-1/3 w-full lg:mx-auto mx-10">
        <Link to={"/"}>
          <h1 className="text-lg lg:text-2xl font-bold">BidSync</h1>
        </Link>
        <div className="mt-4">
          <h1 className="text-center mb-2 font-semibold text-2xl">Sign up</h1>
          <div>
            <label htmlFor="" className="text-lg font-semibold">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className={inputStyle}
              name="name"
              value={userCredential.name}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
          </div>
          <div>
            <label htmlFor="" className="text-lg font-semibold">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter you email"
              className={inputStyle}
              name="email"
              value={userCredential.email}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor=""
              className="text-lg font-semibold flex justify-between items-end select-none"
            >
              <span> Password</span>
              <span
                onClick={() =>
                  setShowPass((p) => ({
                    ...p,
                    password: !p.password,
                  }))
                }
                className="text-sm font-normal cursor-pointer "
              >
                {showPass.password ? (
                  <HiOutlineEye size={20} />
                ) : (
                  <HiOutlineEyeSlash size={20} />
                )}
              </span>
            </label>
            <input
              type={showPass.password ? "text" : "password"}
              placeholder="Password"
              className={inputStyle}
              name="password"
              value={userCredential.password}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor=""
              className="text-lg font-semibold flex justify-between items-end select-none"
            >
              <span>Confirm password</span>
              <span
                onClick={() =>
                  setShowPass((p) => ({
                    ...p,
                    confirmPassword: !p.confirmPassword,
                  }))
                }
                className="text-sm font-normal cursor-pointer "
              >
                {showPass.confirmPassword ? (
                  <HiOutlineEye size={20} />
                ) : (
                  <HiOutlineEyeSlash size={20} />
                )}
              </span>
            </label>
            <input
              type={showPass.confirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className={inputStyle}
              name="confirmPassword"
              value={userCredential.confirmPassword}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
          </div>
          <span className="text-red-500">{error}</span>

          <div className="text-center mt-3">
            <Button
              disabled={loading}
              type={"button"}
              clickFunc={handleUserSignup}
            >
              Sign up
            </Button>
          </div>
        </div>

        <div className="mt-5">
          <h1>
            Already have an account?
            <Link to={"/login"}>
              <span className="text-blue-600 underline">Login</span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Signup;
