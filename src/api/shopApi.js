import axios from "axios";

const BASE_URL = "http://localhost:3030/shop";

export const getArticles = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/articles`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching articles:",
      error?.response?.data || error.message
    );
    throw new Error("Failed to fetch articles. Please try again later.");
  }
};

export const getArticleById = async (id) => {
  if (!id) {
    throw new Error("Article ID is required to fetch article details.");
  }

  try {
    const response = await axios.get(`${BASE_URL}/article/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching article:",
      error?.response?.data || error.message
    );
    throw new Error(
      `Failed to fetch article with ID: ${id}. Please try again later.`
    );
  }
};

export const getArticlesByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${BASE_URL}/articles/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching article:",
      error?.response?.data || error.message
    );
    throw new Error(
      `Failed to fetch article with categoryId: ${categoryId}. Please try again later.`
    );
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching categories:",
      error?.response?.data || error.message
    );
    throw new Error("Failed to fetch categories. Please try again later.");
  }
};
