import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "./useAxios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("/auth/login", values);

      if (response.data.status === "success") {
        const { data } = response;
        toast.success(`Login successful. Welcome, ${data.userData.name}!`);
        login(data.token, data.userData);
        navigate("/task");
      } else if (response.data.status === "fail") {
        const { data } = response;
        toast.error(data.message);
      }
    } catch (error) {
      setError(error.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default useLogin;
