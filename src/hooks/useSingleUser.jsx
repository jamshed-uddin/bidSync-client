import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useSingleUser = () => {
  const { user } = useAuth();
  const [singleUser, setSingleUser] = useState();

  useEffect(() => {
    const loadData = async () => {
      const data = await axios.get(
        `${import.meta.env.VITE_baseUrl}/user/${user?.email}`
      );
      setSingleUser(data?.data.data);

      console.log(data);
    };

    loadData();
  }, [user]);

  return { singleUser };
};

export default useSingleUser;
