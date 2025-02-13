import axios from "axios";

const BASE_URL = "http://localhost:3030";

export const postLogin = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error Authentication",
      error?.response?.data || error.message
    );
    throw new Error("Failed to authenticate. Please try again later.");
  }
};

export const postSignup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error Authentication",
      error?.response?.data || error.message
    );
    throw new Error("Failed to authenticate. Please try again later.");
  }
};
