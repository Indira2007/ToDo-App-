const authMiddleware = require("../middleware/authMiddleware");

const express = require("express");
const {
  getTasks,
  getTodayTasks,
  getPendingTasks,
  getTrashTasks,
  createTask,
  updateTask,
  moveTaskToTrash,
  restoreTask,
  deleteTaskForever,
} = require("../Controllers/TaskControllers");

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.get("/today", authMiddleware, getTodayTasks);
router.get("/Today", authMiddleware, getTodayTasks);
router.get("/PendingTasks", authMiddleware, getPendingTasks);
router.get("/Trash", authMiddleware, getTrashTasks);
router.post("/AddTask", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.patch("/:id/trash", authMiddleware, moveTaskToTrash);
router.patch("/:id/restore", authMiddleware, restoreTask);
router.delete("/:id", authMiddleware, deleteTaskForever);

module.exports = router;
