import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Charts from "../../components/Chart";

const Track = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/task");
      const grouped = groupTasksByStatus(res.data.tasks);
      setTasks(grouped);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  const groupTasksByStatus = taskList => {
    const categories = ["Todo", "Pending", "In Progress", "Completed"];
    return categories.map(status => ({
      category: status,
      color: getColor(status),
      items: taskList.filter(task => task.status === status),
    }));
  };

  const getColor = status => {
    switch (status) {
      case "Todo":
        return "purple";
      case "Pending":
        return "blue";
      case "In Progress":
        return "yellow";
      case "Completed":
        return "red";
      default:
        return "gray";
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <Charts tasks={tasks} />
    </div>
  );
};

export default Track;
