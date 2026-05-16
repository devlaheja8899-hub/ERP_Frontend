import API from "../services/api";

export const loginUser = async (username, password) => {
  const response = await API.post("token/", {
    username,
    password,
  });

  localStorage.setItem("access", response.data.data.access);
  localStorage.setItem("refresh", response.data.data.refresh);

  return response.data;
};