import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./Navbar";
import ToDosList from "./ToDosList";
import Sidebar from "./Sidebar";
import Today from "./Today";
import Trash from "./Trash";
import PendingTasks from "./PendingTasks";
function App() {
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
  <>
    <BrowserRouter>
      <Navbar layout={layout} 
      setLayout={setLayout}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        tasks={tasks}
      />

      <div className="app-container">
        <Sidebar isCollapsed={isCollapsed} />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/AddTask"
              element={<ToDosList tasks={tasks} setTasks={setTasks}  layout={layout} />}
            />
            <Route
              path="/today"
              element={<Today tasks={tasks} setTasks={setTasks} layout={layout} />}
            />
            <Route
              path="/Trash"
              element={<Trash tasks={tasks} setTasks={setTasks} layout={layout} />}
            />
            <Route
              path="/PendingTasks"
              element={<PendingTasks tasks={tasks} setTasks={setTasks} layout={layout} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>

    <Footer />
  </>
);
}
export default App;
