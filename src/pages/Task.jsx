import React from "react";
import { useAuth } from "../contexts/AuthContext";
import InputField from "../components/InputField";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const navigate = useNavigate();
  const { userData, logout } = useAuth();

  const handleOut = () => {
    logout();
    navigate("/");
  };
  return (
    <div className=" container mx-auto">
      {/* Upper tab of user */}
      <div className=" flex justify-end gap-4 p-5 items-center">
        <h2 className=" text-red-800 font-bold italic">
          Welcome,{userData.name}
        </h2>
        <button className=" btn btn-primary btn-sm" onClick={handleOut}>
          LogOut
        </button>
      </div>

      <InputField />
      <TaskList />
    </div>
  );
};

export default Task;
