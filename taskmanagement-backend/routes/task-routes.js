const express = require("express");
const Task = require("../db/models/task-schema");

const router = express.Router();

//POST
router.post("/task", async (req, res) => {
  try {
    const { body } = req;
    const response = await Task.create(body);
    return res
      .status(201)
      .json({ success: true, message: "Task Added", data: response });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

//GET
router.get("/task", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      sortby = "createdAt",
      sortorder = "desc",
    } = req.query;

    // Convert page and limit to numbers
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    // Build query object
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" }; // Case-insensitive search on title
    }
    if (status) {
      query.status = status; // Filter by status (Pending, In Progress, Completed)
    }

    // Fetch filtered tasks with pagination and sorting
    const tasks = await Task.find(query)
      .sort({ [sortby]: sortorder === "asc" ? 1 : -1 })
      .limit(limitNumber)
      .skip((pageNumber - 1) * limitNumber);

    // Get total number of tasks matching the query
    const totalTasks = await Task.countDocuments(query);

    // Send response
    return res.status(200).json({
      tasks,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalTasks / limitNumber),
      totalTasks,
    });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

//GET by ID
router.get("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Task.findById(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

//DELETE
router.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Task.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "task with ${id} deleted", data: response });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

//UPDATE
router.patch("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await Task.findByIdAndUpdate(id, body);
    return res
      .status(200)
      .json({ message: "task with ${id} updated", data: response });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

// PUT: update a task by ID
router.put("/task/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
