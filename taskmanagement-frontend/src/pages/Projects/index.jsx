import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTaskForm from "../../components/AddTaskForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./project.css";

const Projects = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

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

  const handleDragStart = (e, task, sourceCategory) => {
    e.dataTransfer.setData("task", JSON.stringify({ task, sourceCategory }));
  };

  const handleDrop = async (e, targetCategory) => {
    e.preventDefault();
    const { task, sourceCategory } = JSON.parse(e.dataTransfer.getData("task"));
    if (sourceCategory === targetCategory) return;

    try {
      await axios.patch(`http://localhost:3000/task/${task._id}`, {
        status: targetCategory,
      });
      toast.success("Task updated");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleOpenForm = (category, task = null) => {
    setActiveCategory(category);
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setActiveCategory(null);
    setEditingTask(null);
  };

  const handleSaveTask = async taskData => {
    try {
      if (editingTask) {
        await axios.put(
          `http://localhost:3000/task/${editingTask._id}`,
          taskData
        );
        toast.success("Task updated");
      } else {
        await axios.post("http://localhost:3000/task", taskData);
        toast.success("Task saved");
      }
      handleCloseForm();
      fetchTasks();
    } catch (error) {
      toast.error("Failed to save task");
    }
  };

  const handleDeleteTask = async taskId => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:3000/task/${taskId}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const getPriorityClass = priority => {
    switch (priority) {
      case "High":
        return "priority-box priority-high";
      case "Low":
        return "priority-box priority-low";
      default:
        return "priority-box priority-normal";
    }
  };

  return (
    <div className="main-container">
      <div className="project-board">
        {tasks.map((list, index) => (
          <div
            key={index}
            className="project-column"
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(e, list.category)}
          >
            <div className={`project-header ${list.color}`}>
              <span>{list.category}</span>
              <button
                className="add-btn"
                onClick={() => handleOpenForm(list.category)}
              >
                +
              </button>
            </div>
            <div className="project-list">
              {list.items.map(task => (
                <div
                  key={task._id}
                  className="project-card"
                  draggable
                  onDragStart={e => handleDragStart(e, task, list.category)}
                >
                  <div className="project-title">
                    {task.title}
                    <div className="project-date">
                      {new Date(task.deadline).toLocaleDateString()}
                    </div>
                  </div>
                  <p>{task.description}</p>

                  <div className={getPriorityClass(task.priority)}>
                    {task.priority}
                  </div>

                  <div className="project-footer">
                    <span>{task.members || 0} </span>

                    <div className="project-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleOpenForm(list.category, task)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteTask(task._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseForm}>
              ×
            </button>
            <AddTaskForm
              onCancel={handleCloseForm}
              onSave={handleSaveTask}
              category={activeCategory}
              initialData={editingTask}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
