import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/AddTask", icon: "➕", label: "Add Task" },
    { path: "/Today", icon: "📅", label: "Today" },
    { path: "/Trash", icon: "🗑️", label: "Trash" },
    { path: "/PendingTasks", icon: "⏳", label: "Pending Tasks" },
  ];

  return (
    <>
      <style>{`
        .sidebar {
          height: 100vh;
          background: #1e1e2f;
          color: #fff;
          padding: 20px 10px;
          box-sizing: border-box;
          transition: width 0.3s ease;
          overflow: hidden;
        }

        .menu {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .menu-item {
          padding: 12px 15px;
          margin: 8px 0;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.2s ease;
        }

        .menu-item:hover {
          background: #2f2f45;
        }

        .menu-item.active {
          background: #4c6ef5;
        }

        .icon {
          font-size: 18px;
          min-width: 24px;
          text-align: center;
        }

        .text {
          white-space: nowrap;
          transition: opacity 0.2s ease;
        }
      `}</style>

      <div
        className="sidebar"
        style={{
          width: isCollapsed ? "70px" : "220px",
        }}
      >
        <ul className="menu">
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`menu-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => navigate(item.path)}
              title={isCollapsed ? item.label : ""}
            >
              <span className="icon">{item.icon}</span>
              {!isCollapsed && <span className="text">{item.label}</span>}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;