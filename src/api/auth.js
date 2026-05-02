import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// SIGNUP (NOW SUPPORTS FILES)
export const signupUser = (formData) => {
  return axios.post(`${API}/auth/signup`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};