import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/task/gettask/${id}`);
      setData(res.data.result);
    };
    fetchData();
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await axios.patch(`/task/update/${id}`, data);

    if (res.status === 201) {
      toast.success("Task Updated");
      navigate("/");
    } else {
      toast.success("Something is wrong");
    }
  };

  return (
    <div className=" container mx-auto flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="   ">
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Task Name
            </label>
            <input
              {...register("name")}
              defaultValue={data?.name}
              type="text"
              placeholder="Enter task name"
              className="input input-bordered input-primary h-10 w-full max-w-xs"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Task Description
            </label>
            <input
              {...register("description")}
              defaultValue={data?.description}
              type="text"
              placeholder="Enter description"
              className="input input-bordered input-primary h-10 w-full max-w-xl"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Date
            </label>
            <input
              {...register("date")}
              defaultValue={
                data ? new Date(data.date).toISOString().substr(0, 10) : ""
              }
              type="date"
              placeholder="Enter description"
              className="input input-bordered input-primary h-10 w-full max-w-xl"
            />
          </div>
        </div>
        <div className="">
          <button type="submit" className=" btn btn-outline btn-md">
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskDetails;
