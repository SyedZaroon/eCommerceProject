import api from "./api";

export const loginUser = async (userData) => {
  try {
    const res = await api.post("/login", userData);
    return res.data;
  } catch (error) {
    console.log("Login API Error:", error.response?.data);
    console.log("Status Code:", error.response?.status);

    throw new Error(
      error.response?.data?.message || "Login failed"
    );
  }
};
