import React, { useContext } from "react";
import { DataContext } from "../providers/DataProvider";

const useAllData = () => {
  const allData = useContext(DataContext);
  return allData;
};

export default useAllData;
