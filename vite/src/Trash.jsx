import React from "react";
import ToDoItem from "./ToDoItem";
import { useAppContext } from "./AppContext";
const Trash = () => {
  const { tasks, restoreTask, deleteTaskForever, layout, theme } = useAppContext();
  const isDark = theme === "dark";
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "20px",
      color: isDark ? "#fff" : "#333",
    },
    empty: {
      fontSize: "16px",
      color: isDark ? "#ccc" : "#777",
      textAlign: "center",
      marginTop: "40px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px",
    },
    restoreBtn: {
      padding: "8px 14px",
      backgroundColor: isDark ? "#4CAF50" : "#4CAF50",
      border: "none",
      borderRadius: "6px",
      color: "#fff",
      cursor: "pointer",
    },
    deleteBtn: {
      padding: "8px 14px",
      backgroundColor: isDark ? "#ff4d4f" : "#ff4d4f",
      border: "none",
      borderRadius: "6px",
      color: "#fff",
      cursor: "pointer",
    },
  };


  const trashTasks = tasks.filter((t) => t.deleted);

  // 🔁 Restore
  const handleRestoreTask = async (id) => {
    try {
      await restoreTask(id);
    } catch (err) {
      console.error(err);
      alert("Failed to restore task");
    }
  };

  const handleDeleteForever = async (id) => {
    try {
      await deleteTaskForever(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🗑️ Trash</h2>

      {trashTasks.length === 0 ? (
        <p style={styles.empty}>Trash is empty 🧹</p>
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
          {trashTasks.map((item) => (
            <li key={item._id}>
              
              {/* Task Card */}
              <ToDoItem
                task={item.task}
                desc={item.desc}
                date={item.date}
                Priority={item.priority}
                hideDelete={true}
              />

              {/* Actions */}
              <div style={styles.buttonContainer}>
                <button
                  style={styles.restoreBtn}
                  onClick={() => handleRestoreTask(item._id)}
                >
                  Restore 
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDeleteForever(item._id)}
                >
                  Delete Forever 
                </button>
              </div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Trash;
