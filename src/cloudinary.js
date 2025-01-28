import axios from "axios";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "olx-clone");
  formData.append("cloud_name", "dlepjhjb4");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dlepjhjb4/image/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
