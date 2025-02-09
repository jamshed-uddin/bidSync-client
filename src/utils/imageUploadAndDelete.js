import axios from "axios";

const token = localStorage.getItem("jwt");

export const uploadImage = async (files) => {
  const formData = new FormData();
  if (files.length > 0) {
    files.forEach((file) => {
      formData.append("files", file);
    });
  }

  return await axios.post(
    `${import.meta.env.VITE_baseUrl}/listings/image/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }
  );
};

export const deleteImage = async (publicIds) => {
  return await axios.post(
    `${import.meta.env.VITE_baseUrl}/listings/image/delete`,
    { publicIds },
    { headers: { Authorization: token } }
  );
};
