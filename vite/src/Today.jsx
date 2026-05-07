import ToDoItem from "./ToDoItem";
import React from "react";
import { useAppContext } from "./AppContext";
const Today = () => {
  const { tasks, setTasks, layout } = useAppContext();

  // 🎨 Styles

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "20px",
      color: "#333",
    },
    empty: {
      textAlign: "center",
      color: "#777",
      marginTop: "40px",
      fontSize: "16px",
    },
    list: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "15px",
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "450px",
    },
    deleteBtn: {
      marginTop: "10px",
      padding: "8px 14px",
      backgroundColor: "#ff4d4f",
      border: "none",
      borderRadius: "6px",
      color: "#fff",
      cursor: "pointer",
    },
  };

  // ✅ Filter today's + non-deleted tasks
  const todaysTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date);
    const today = new Date();

    return taskDate.toDateString() === today.toDateString() && !task.deleted;
  });

  // ✅ Delete (move to trash)
  const deleteTask = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, deleted: true } : t,
    );

    setTasks(updatedTasks);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📅 Today's Tasks</h2>

      {todaysTasks.length === 0 ? (
        <p style={styles.empty}>No tasks for today 😴</p>
      ) : (
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
          {todaysTasks.map((item) => (
            <ToDoItem
              key={item.id}
              task={item.task}
              desc={item.desc}
              date={item.date}
              Priority={item.priority}
              onDelete={() => deleteTask(item.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Today;
