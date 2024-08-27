import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import Button from "../components/Button";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

const Login = () => {
  const { user, userLogin, loading, loginWithGoogle } = useAuth();
  const [userCredential, setUserCredential] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleUserLogin = async () => {
    try {
      await userLogin(userCredential.email, userCredential.password);
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        setError("Invalid credential");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await loginWithGoogle();

      const userBody = { name: res?.user?.displayName, email: res.user?.email };
      await axios.post(`${import.meta.env.VITE_baseUrl}/user`, userBody);
    } catch (error) {}
  };

  const inputStyle = "input input-bordered w-full  focus:outline-none bg-white";

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="lg:w-1/3 w-full lg:mx-auto mx-10">
        <Link to={"/"}>
          <h1 className="text-lg lg:text-2xl font-bold">BidSync</h1>
        </Link>
        <div className="mt-4">
          <h1 className="text-center mb-2 font-semibold text-2xl">Login</h1>
          <div className="w-full">
            <label htmlFor="" className="text-lg font-semibold block">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter you email"
              className={inputStyle}
              name="email"
              value={userCredential.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2 w-full">
            <label
              htmlFor=""
              className="text-lg font-semibold flex justify-between items-end select-none "
            >
              <span> Password</span>
              <span
                onClick={() => setShowPass((p) => !p)}
                className="text-sm font-normal cursor-pointer "
              >
                {showPass ? (
                  <HiOutlineEye size={20} />
                ) : (
                  <HiOutlineEyeSlash size={20} />
                )}
              </span>
            </label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Your password"
              className={inputStyle}
              name="password"
              value={userCredential.password}
              onChange={handleInputChange}
            />
          </div>
          <span className="text-red-500">{error}</span>

          <div className="text-center mt-3">
            <Button
              disabled={loading}
              type={"button"}
              clickFunc={handleUserLogin}
            >
              Login
            </Button>
          </div>
        </div>
        {/* social login */}
        <div className="text-center mt-3">
          <div className="divider">Or</div>
          <h2 className="text-xl font-semibold">Continue with</h2>
          <div className=" mt-2">
            <Button clickFunc={handleGoogleLogin} style={"bordered"}>
              <FaGoogle />
            </Button>
          </div>
        </div>

        <div className="mt-5">
          <h1>
            New to BidSync?
            <Link to={"/signup"}>
              <span className="text-blue-600 underline">Sign up</span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
