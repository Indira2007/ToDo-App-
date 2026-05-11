import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [layout, setLayout] = useState("list");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    console.log("isCollapsed:", isCollapsed);
  }, [isCollapsed]);

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        isCollapsed,
        setIsCollapsed,
        layout,
        setLayout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
