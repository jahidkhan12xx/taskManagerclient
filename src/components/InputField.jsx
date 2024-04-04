import React from "react";
import { useForm } from "react-hook-form";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import useTaskData from "../hooks/useData";

const InputField = () => {
  const axios = useAxios();
  const { tasks, isLoading, refetch } = useTaskData();
  const { userData } = useAuth();
  console.log(userData);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const task = {
      ...data,
      userId: userData._id,
    };

    const res = await axios.post("/task/addtask", task);

    console.log(res);
    if (res.status === 201) {
      toast.success("Task Added");
      refetch();
    } else {
      toast.error(res.data.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex gap-3 items-center">
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Task Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter task name"
              className="input input-bordered input-primary h-10 w-full max-w-xs"
            />
            {errors.name && (
              <span className=" text-red-700">Name is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Task Description
            </label>
            <input
              {...register("description", { required: true })}
              type="text"
              placeholder="Enter description"
              className="input input-bordered input-primary h-10 w-full max-w-xl"
            />
            {errors.description && (
              <span className=" text-red-700">Description is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Date
            </label>
            <input
              {...register("date", { required: true })}
              type="date"
              placeholder="Enter description"
              className="input input-bordered input-primary h-10 w-full max-w-xl"
            />
            {errors.date && (
              <span className=" text-red-700">Date is required</span>
            )}
          </div>
        </div>
        <div className="">
          <button type="submit" className=" btn btn-outline btn-md">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputField;
