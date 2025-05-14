import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./reports.css";

const Reports = () => {
  const { state } = useLocation(); // Get the state passed from the Header component
  const query = state?.query || ""; // Access the search query

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/task");
      setTasks(res.data.tasks);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = tasks.filter(
        task =>
          task.title.toLowerCase().includes(query.toLowerCase()) ||
          task.status.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks); // If no query, show all tasks
    }
  }, [query, tasks]);

  return (
    <div className="reports-container">
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No tasks found based on the search query.</p>
        ) : (
          filteredTasks.map(task => (
            <div key={task._id} className="task-card">
              <div className="task-title">{task.title}</div>
              <div className="task-status">{task.status}</div>
              {/* Other task details */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reports;
