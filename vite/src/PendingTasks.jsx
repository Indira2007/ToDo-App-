import ToDoItem from "./ToDoItem";
import { useAppContext } from "./AppContext";
const PendingTasks = () => {
  const { tasks, moveTaskToTrash, layout, theme } = useAppContext();
  const isDark = theme === "dark";

  const pendingTasks = tasks.filter((t) => {
    if (t.deleted) return false;

    const taskDate = new Date(t.date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);

    return taskDate < today;
  });

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "20px" , color: isDark ? "#fff" : "#333"}}>
        ⏳ Pending Tasks
      </h2>

      {pendingTasks.length === 0 ? (
        <p style={{ textAlign: "center", color: isDark ? "#ccc" : "#555" }}>
          No pending tasks! 🎉
        </p>
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
          {pendingTasks.map((item) => (
            <ToDoItem
              key={item._id}
              task={item.task}
              desc={item.desc}
              date={item.date}
              Priority={item.priority}
              onDelete={async () => {
                try {
                  await moveTaskToTrash(item._id);
                } catch (err) {
                  console.error(err);
                  alert("Failed to move task to trash");
                }
              }}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default PendingTasks;
