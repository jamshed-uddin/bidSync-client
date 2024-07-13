const isProfileComplete = (singleUser) => {
  const isAddressComplete = () => {
    for (let key in singleUser?.address) {
      if (!singleUser?.address[key]) {
        return false;
      }
      return true;
    }
  };

  if (singleUser?.bankInfoAdded && isAddressComplete()) {
    return true;
  } else {
    return false;
  }
};

export default isProfileComplete;
