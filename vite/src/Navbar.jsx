import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";
import { Settings, LayoutGrid, List, Sun, Moon } from "lucide-react";

function Navbar() {
  const { layout, setLayout, setIsCollapsed, tasks, theme, setTheme } =
    useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      navigate("/AddTask");
      return;
    }

    const foundTask = tasks.find((t) =>
      t.task.toLowerCase().includes(term.toLowerCase()),
    );

    if (!foundTask) return;

    const taskDate = new Date(foundTask.date);
    const todayDate = new Date();

    todayDate.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);

    if (foundTask.deleted) {
      navigate("/Trash");
    } else if (taskDate < todayDate) {
      navigate("/PendingTasks");
    } else if (taskDate.getTime() === todayDate.getTime()) {
      navigate("/today");
    } else {
      navigate("/AddTask");
    }
  };
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <button
          style={styles.menu}
          onClick={() => {
            setIsCollapsed((prev) => !prev);
          }}
        >
          ☰
        </button>

        <h2 style={styles.logo}>TO DO</h2>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          style={styles.search}
        />
      </div>

      <div style={styles.right}>
        <button
          style={styles.btn}
          onClick={() =>
            setLayout((prev) => (prev === "list" ? "grid" : "list"))
          }
        >
          {layout === "list" ? <LayoutGrid size={20} /> : <List size={20} />}
          <span>{layout === "list" ? " Grid" : " List"}</span>
        </button>
        <button
          style={styles.btn}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Settings size={20} style={{ cursor: "pointer" }} />
        <span style={styles.profile}>M</span>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#202124",
    padding: "10px 20px",
    color: "white",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "15px",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  menu: {
    fontSize: "20px",
    cursor: "pointer",
    background: "transparent"
  },
  layout: {
    height: "24px",
    width: "24px",
    cursor: "pointer",
    padding: "5px",
  },
  logo: {
    margin: 0,
  },

  searchContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },

  search: {
    width: "60%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    backgroundColor: "#303134",
    color: "white",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  icon: {
    cursor: "pointer",
    height: "50px",
    width: "60px",
  },

  profile: {
    backgroundColor: "#8ab4f8",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
};

export default Navbar;
