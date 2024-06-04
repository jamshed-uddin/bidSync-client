import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_baseUrl}/listings`
      );

      console.log(result);
      setAllListings(result?.data?.data);
    };

    loadData();
  }, []);

  const allData = {
    allListings,
  };

  return (
    <DataContext.Provider value={allData}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
