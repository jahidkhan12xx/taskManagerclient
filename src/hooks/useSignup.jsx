import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "./useAxios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (values) => {
    try {
      setLoading(true);
      setError(null);
      console.log(values);

      if (values.password !== values.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await axios.post("/auth/signup", values);

      console.log(response.data);

      if (response.status === 201) {
        const { data } = response;
        toast.success(
          `Registration successful. Welcome, ${data.newUser.name}!`
        );
        login(data.token, data.newUser);
        navigate("/login");
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

  return { loading, error, registerUser };
};

export default useSignup;
