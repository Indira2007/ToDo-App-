import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ToDosList from "./ToDosList";
import Sidebar from "./Sidebar";
import Today from "./Today";
import Trash from "./Trash";
import PendingTasks from "./PendingTasks";
import { AppProvider } from "./AppContext";
import Register from "./Register";
import Login from "./Login";
function AppContent() {
  const location = useLocation();

  const isAuthPage =
    location.pathname.toLowerCase() === "/login" ||
    location.pathname.toLowerCase() === "/register";
  return (
    <>
      {!isAuthPage && <Navbar />}

      <div className={isAuthPage ? "" : "app-container"}>
        {!isAuthPage && <Sidebar />}

        <div className={isAuthPage ? "" : "main-content"}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ToDosList />} />
            <Route path="/AddTask" element={<ToDosList />} />
            <Route path="/today" element={<Today />} />
            <Route path="/Trash" element={<Trash />} />
            <Route path="/PendingTasks" element={<PendingTasks />} />
          </Routes>
        </div>
      </div>

      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
