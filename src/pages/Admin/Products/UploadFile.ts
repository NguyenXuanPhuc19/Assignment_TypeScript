import axios from "axios";
export const uploadFile = (file:any) => {
    const CLOUDINARY_NAME = "df6zs06nu";
    const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`;
    const CLOUDINARY_PRESET = "ssmbyn9v";
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);
    const res = axios.post(CLOUDINARY_API, formData, {
      headers: {
        "Content-Type": "application/form-data"
      }
    });
  
    return res;
  };