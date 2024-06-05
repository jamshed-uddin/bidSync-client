import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_baseUrl,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { userLogout } = useAuth();

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("jwt");

      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response.status;
      const message = error?.response?.data?.message;
      if (
        (status === 401 || status === 403) &&
        (message === "Unauthorized action.Invalid token" ||
          message === "Unauthorized action.No token")
      ) {
        await userLogout();
        navigate("/");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
