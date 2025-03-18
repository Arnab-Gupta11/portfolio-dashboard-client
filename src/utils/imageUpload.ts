/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import toast from "react-hot-toast";

const imageUpload = async (img: any) => {
  const data = new FormData();
  data.append("file", img);
  data.append("upload_preset", "stationaryApp_preset");

  try {
    const cloudName = "dgxvtrpmh";
    const resourceType = "image";
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const res = await axios.post(api, data);
    const { secure_url } = res.data;
    return secure_url;
  } catch (error) {
    toast.error("Image upload failed. Try again later.");
  }
};

export default imageUpload;
