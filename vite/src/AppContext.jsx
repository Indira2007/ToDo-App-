import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/Tasks";

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [layout, setLayout] = useState("list");

  const addTask = async (newTask) => {
    const res = await fetch(`${API_URL}/AddTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!res.ok) {
      throw new Error("Failed to add task");
    }

    const savedTask = await res.json();
    setTasks((prev) => [...prev, savedTask]);
    return savedTask;
  };

  const moveTaskToTrash = async (id) => {
    const res = await fetch(`${API_URL}/${id}/trash`, {
      method: "PATCH",
    });

    if (!res.ok) {
      throw new Error("Failed to move task to trash");
    }

    const updatedTask = await res.json();
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? updatedTask : task))
    );
  };

  const restoreTask = async (id) => {
    const res = await fetch(`${API_URL}/${id}/restore`, {
      method: "PATCH",
    });

    if (!res.ok) {
      throw new Error("Failed to restore task");
    }

    const updatedTask = await res.json();
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? updatedTask : task))
    );
  };

  const deleteTaskForever = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete task");
    }

    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  useEffect(() => {
    console.log("isCollapsed:", isCollapsed);
  }, [isCollapsed]);

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        moveTaskToTrash,
        restoreTask,
        deleteTaskForever,
        isCollapsed,
        setIsCollapsed,
        layout,
        setLayout,
        theme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
