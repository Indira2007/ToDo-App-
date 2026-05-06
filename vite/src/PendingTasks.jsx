import ToDoItem from "./ToDoItem";
const PendingTasks = ({ tasks, setTasks, layout, setLayout }) => {
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        ⏳ Pending Tasks
      </h2>

      {pendingTasks.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>
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
              key={item.id}
              task={item.task}
              desc={item.desc}
              date={item.date}
              Priority={item.priority}
              onDelete={() => {
                setTasks((prev) =>
                  prev.map((t) =>
                    t.id === item.id ? { ...t, deleted: true } : t,
                  ),
                );
              }}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default PendingTasks;
