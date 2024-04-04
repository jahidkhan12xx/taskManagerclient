import React from "react";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import useTaskData from "../hooks/useData";
import { Link } from "react-router-dom";

const TaskList = () => {
  const axios = useAxios();

  const { tasks, isLoading, refetch } = useTaskData();

  const handleDelete = async (id) => {
    const res = await axios.delete(`/task/deletetask/${id}`);

    if (res.status === 201) {
      toast.success("Task deleted");

      refetch();
    } else {
      toast.error("Something went wrong!");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className=" my-11">
      <h2 className=" underline text-2xl font-bold">TaskList</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Task</th>
              <th>Description</th>
              <th>Finish Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.data?.map((task, id) => (
              <tr key={id}>
                <th>{id + 1}</th>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>
                  {new Date(task.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                  })}
                </td>
                <td className=" flex gap-1">
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/task/${task._id}`}>
                    <button className="btn btn-sm btn-ghost">Update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
