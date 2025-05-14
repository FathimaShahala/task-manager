import React, { useState, useEffect } from "react";
import "./addtaskform.css";

const AddTaskForm = ({ onCancel, onSave, category, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: category || "Pending",
    priority: "Normal",
    members: 1,
    deadline: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || category || "Pending",
        priority: initialData.priority || "Normal",
        members: initialData.members || 1,
        deadline: formatDate(initialData.deadline),
      });
    }
  }, [initialData]);

  const formatDate = dateStr => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0]; // ensures format YYYY-MM-DD
  };

  const validate = () => {
    const err = {};
    if (!formData.title.trim()) {
      err.title = "Title is required";
    } else if (formData.title.length < 3) {
      err.title = "Title must be at least 3 characters";
    }

    if (!formData.deadline) {
      err.deadline = "Deadline is required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    await onSave(formData);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{initialData ? "Edit Task" : "Add New Task"}</h3>

      <label>Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="This is a title"
      />
      {errors.title && <div className="error-text">{errors.title}</div>}

      <label>Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Task details..."
      />

      <div className="form-row">
        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Members</label>
          <input
            type="number"
            name="members"
            min="1"
            value={formData.members}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
          {errors.deadline && (
            <div className="error-text">{errors.deadline}</div>
          )}
        </div>
      </div>

      <div className="form-buttons">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="save-btn">
          Save
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
