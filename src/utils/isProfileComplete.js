const isProfileComplete = (singleUser) => {
  const isAddressComplete = () => {
    for (let key in singleUser?.address) {
      if (!singleUser?.address[key] && key !== "state" && key !== "city") {
        return false;
      }
      return true;
    }
  };

  if (singleUser && singleUser?.bankInfoAdded && isAddressComplete()) {
    return true;
  } else {
    return false;
  }
};

export default isProfileComplete;
