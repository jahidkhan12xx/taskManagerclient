import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";

const useTaskData = () => {
  const axios = useAxios();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "tasks",
    queryFn: fetchTasks,
    config: {
      refetchInterval: 1000, // Poll every 5 seconds
    },
  });

  async function fetchTasks() {
    const response = await axios.get("/task/gettask");
    return response.data;
  }

  return { tasks: data, isLoading, isError, refetch };
};

export default useTaskData;
