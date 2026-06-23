import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ToDosList from "./ToDosList";
import Sidebar from "./Sidebar";
import Today from "./Today";
import Trash from "./Trash";
import PendingTasks from "./PendingTasks";
import { AppProvider } from "./AppContext";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />

        <div className="app-container">
          <Sidebar />

          <div className="main-content">
            <Routes>

              <Route path="/" element={<ToDosList />} />
              <Route path="/AddTask" element={<ToDosList />} />
              <Route path="/today" element={<Today />} />
              <Route path="/Trash" element={<Trash />} />
              <Route path="/PendingTasks" element={<PendingTasks />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>

      <Footer />
    </AppProvider>
  );
}
export default App;
