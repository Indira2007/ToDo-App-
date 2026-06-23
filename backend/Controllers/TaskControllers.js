const Task = require("../models/TaskModel");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const getTodayTasks = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const tasks = await Task.find({
      deleted: false,
      date: { $gte: start, $lt: end },
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch today's tasks" });
  }
};

const getPendingTasks = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tasks = await Task.find({
      deleted: false,
      date: { $lt: today },
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending tasks" });
  }
};

const getTrashTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ deleted: true });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trash tasks" });
  }
};

// POST create a new task
const createTask = async (req, res) => {
  try {
    const { task, desc, date, priority } = req.body;

    if (!task || !desc || !date) {
      return res
        .status(400)
        .json({ message: "Task, description, and date are required" });
    }

    const newTask = new Task({ task, desc, date, priority });
    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

// PUT update a task
const updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Task not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

const moveTaskToTrash = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Task not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to move task to trash" });
  }
};

const restoreTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { deleted: false },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Task not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to restore task" });
  }
};

// DELETE a task forever
const deleteTaskForever = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

module.exports = {
  getTasks,
  getTodayTasks,
  getPendingTasks,
  getTrashTasks,
  createTask,
  updateTask,
  moveTaskToTrash,
  restoreTask,
  deleteTaskForever,
};
