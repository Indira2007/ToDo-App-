import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import { useAppContext } from "./AppContext";
const ToDosList = () => {
  const { tasks, addTask, moveTaskToTrash, layout } = useAppContext();

  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.trim() || !desc.trim()) {
      alert("Please fill in both fields");
      return;
    }

    const newTask = {
      task,
      desc,
      date: dueDate || new Date().toISOString(),
      priority,
      deleted: false,
    };

    try {
      await addTask(newTask);

      setTask("");
      setDesc("");
      setDueDate("");
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await moveTaskToTrash(id);
    } catch (err) {
      console.error(err);
      alert("Failed to move task to trash");
    }
  };

  const activeTasks = tasks.filter((t) => !t.deleted);
  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const sortedTasks = [...activeTasks].sort((a, b) => {
    if (sortOrder === "asc") {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
  });

  console.log(tasks);
  console.log(Array.isArray(tasks));
  return (
    <>
      <style>{`
        .todo-container {
          max-width: 800px;
          margin: auto;
        }

        .form {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .input {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
        }

        .btn {
          padding: 10px;
          background: #4c6ef5;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.2s;
        }

        .btn:hover {
          background: #3b5bdb;
        }

        .task-list {
          margin-top: 30px;
          display: ${layout === "grid" ? "grid" : "flex"};
          flex-direction: ${layout === "list" ? "column" : "unset"};
          grid-template-columns: ${layout === "grid" ? "repeat(auto-fill, minmax(250px, 1fr))" : "none"};
          gap: 15px;
          padding: 0;
        }

        .empty {
          text-align: center;
          color: #777;
        }
      `}</style>

      <div className="todo-container">
        <h1>Add Task</h1>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Task</label>
            <input
              className="input"
              type="text"
              placeholder="Enter your task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              className="input"
              type="text"
              placeholder="Enter description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              className="input"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <label>Priority</label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>

        <h2 style={{ marginTop: "30px" }}>Tasks List</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "15px",
          }}
        >
          <button
            className="btn"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Sort: {sortOrder === "asc" ? "High → Low" : "Low → High"}
          </button>
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: layout === "grid" ? "grid" : "flex",
            flexDirection: layout === "list" ? "column" : "unset",
            gridTemplateColumns:
              layout === "grid"
                ? "repeat(auto-fill, minmax(250px, 1fr))"
                : "none",
            gap: "15px",
          }}
        >
          {sortedTasks.length === 0 ? (
            <p className="empty">No tasks yet</p>
          ) : (
            sortedTasks.map((item) => (
              <ToDoItem
                key={item._id}
                task={item.task}
                desc={item.desc}
                date={item.date}
                Priority={item.priority}
                onDelete={() => deleteTask(item._id)}
              />
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default ToDosList;
