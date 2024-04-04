import axios from "axios";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: "https://taskserver-gules.vercel.app/api/v1",
    withCredentials: true,
  });

  const setTokenInAxiosInstance = () => {
    const token = JSON.parse(localStorage.getItem("user_data"));

    if (token) {
      // Set token in request headers
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token.userToken}`;
    }
  };

  setTokenInAxiosInstance();

  return instance;
};

const useAxios = () => {
  return createAxiosInstance();
};

export default useAxios;
