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

router.get("/", getTasks);
router.get("/today", getTodayTasks);
router.get("/Today", getTodayTasks);
router.get("/PendingTasks", getPendingTasks);
router.get("/Trash", getTrashTasks);
router.post("/AddTask", createTask);
router.put("/:id", updateTask);
router.patch("/:id/trash", moveTaskToTrash);
router.patch("/:id/restore", restoreTask);
router.delete("/:id", deleteTaskForever);

module.exports = router;
