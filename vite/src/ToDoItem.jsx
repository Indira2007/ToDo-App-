import React from "react";

const ToDoItem = ({ task, desc, date, Priority, onDelete , hideDelete, actions }) => {
    const priorityColors = {
    High: "#fa5252",
    Medium: "#f59f00",
    Low: "#37b24d", 
  };
  return (
    <>
      <style>{`
  .todo-card {
    list-style: none;
    background: #ffffff;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 180px; 
    transition: 0.2s;
  }

  .todo-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  }

  .todo-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .todo-desc {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
  }

  .todo-date {
    font-size: 12px;
    color: #999;
    margin-top: 8px;
  }

  .todo-footer {
    margin-top: auto; /* 🔥 pushes button down */
  }

  .delete-btn {
    padding: 6px 12px;
    background: #ff4d4f;
    border: none;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    font-size: 13px;
  }

  .delete-btn:hover {
    background: #d9363e;
  }
  .priority-btn {
    padding: 4px 10px;
    background: #eee;
    border: none;
    border-radius: 6px;
    color: #555;
    font-size: 12px;
    width: fit-content;
    margin-top: 10px;
  }
      </style>
`}</style>

      <li className="todo-card">
        <div>
          <h3 className="todo-title">{task}</h3>
          <p className="todo-desc">{desc}</p>
          <p className="todo-date">
            {new Date(date).toDateString()}
          </p>
        </div>
        <button
          className="priority-btn"
          style={{ backgroundColor: priorityColors[Priority] || "#eee" }}
        >
          {Priority}
        </button>

        <div className="todo-footer">
          {actions ? (
            actions
          ) : (
            !hideDelete && (
              <button className="delete-btn" onClick={onDelete}>
                Delete
              </button>
            )
          )}
        </div>
      </li>
    </>
  );
};

export default ToDoItem;